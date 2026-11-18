/* Contrat de validation SunuCSU : aucune requête réseau, aucun accès patient. */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.CMUCoverage=api;
})(typeof globalThis!=="undefined"?globalThis:null,function(){
  "use strict";
  const datePattern=/^\d{4}-\d{2}-\d{2}$/;
  function validDate(s){
    if(typeof s!=="string"||!datePattern.test(s))return false;
    const d=new Date(s+"T12:00:00Z");
    return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s;
  }
  function normalizeRegistration(s){
    if(typeof s!=="string")return null;
    const code=s.trim().toUpperCase();
    return /^[A-Z0-9]{6,24}$/.test(code)?code:null;
  }
  function interpret(payload,requestedCode,today){
    const code=normalizeRegistration(requestedCode);
    if(!code)return {state:"unverified",reason:"invalid_registration"};
    if(!payload||typeof payload!=="object"||Array.isArray(payload))return {state:"unverified",reason:"no_official_response"};
    if(payload.source!=="sunucsu_authorized"||payload.verified!==true)return {state:"unverified",reason:"untrusted_source"};
    if(normalizeRegistration(payload.registration_number)!==code)return {state:"unverified",reason:"registration_mismatch"};
    if(!validDate(today)||!validDate(payload.coverage_start)||!validDate(payload.coverage_end))return {state:"unverified",reason:"invalid_dates"};
    if(payload.coverage_start>payload.coverage_end)return {state:"unverified",reason:"inconsistent_dates"};
    if(typeof payload.last_name!=="string"||!payload.last_name.trim()||typeof payload.first_names!=="string"||!payload.first_names.trim()||!validDate(payload.birth_date))return {state:"unverified",reason:"incomplete_identity"};
    const status=payload.official_status;
    if(!["valid","expired","unknown"].includes(status))return {state:"unverified",reason:"unknown_official_status"};
    if(status==="unknown")return {state:"unverified",reason:"official_status_unknown"};
    const within=today>=payload.coverage_start&&today<=payload.coverage_end;
    if(status==="valid"&&!within)return {state:"unverified",reason:"status_date_conflict"};
    if(status==="expired"&&within)return {state:"unverified",reason:"status_date_conflict"};
    if(status==="expired"&&today<payload.coverage_start)return {state:"unverified",reason:"not_yet_covered"};
    return {state:status,registration_number:code,last_name:payload.last_name.trim(),first_names:payload.first_names.trim(),birth_date:payload.birth_date,coverage_start:payload.coverage_start,coverage_end:payload.coverage_end};
  }
  return {interpret,validDate,normalizeRegistration};
});
