'use client'
// Instructions: Create a multi-step waitlist signup form component in React for Framer. Use the provided HTML/CSS/JS prototype as the reference for design, layout, interactions, and field structure. Fixed 4 steps, dark theme glassmorphism, segmented progress bar, role cards, chips with “Other” reveal, summary, social proof (toggle), terms checkbox, submit triggers nearest form.requestSubmit(), success state in-card. Keep all step panels mounted; hide inactive via CSS, never unmount.
import{jsx as _jsx,jsxs as _jsxs,Fragment as _Fragment}from"react/jsx-runtime";import{startTransition,useEffect,useMemo,useRef,useState,useCallback}from"react";const addPropertyControls=()=>{};const ControlType={};const RenderTarget={current:()=>"",canvas:""};import{AnimatePresence,motion}from"framer-motion";function clamp(n,min,max){return Math.min(max,Math.max(min,n));}function normColorString(v){return v.replace(/\s+/g,"").toLowerCase();}function hexToRgb(hex){const h=hex.replace("#","").trim();const len=h.length;// Support alpha-hex from modern pickers (#RGBA / #RRGGBBAA) by stripping alpha
if(len===4||len===8){const stripped=len===4?h.slice(0,3):h.slice(0,6);return hexToRgb("#"+stripped);}if(![3,6].includes(len)){// fallback: parse rgb()/rgba()
const m=hex.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);if(m)return{r:+m[1],g:+m[2],b:+m[3]};return null;}const full=len===3?h.split("").map(c=>c+c).join(""):h;const int=Number.parseInt(full,16);if(!Number.isFinite(int))return null;return{r:int>>16&255,g:int>>8&255,b:int&255};}function rgba(input,a){const raw=(input??"").trim();if(!raw)return`rgba(15,212,180,${a})`;// If already rgb/rgba, preserve channels and override alpha
if(/^rgba?\(/i.test(raw)){const nums=raw.replace(/rgba?\(/i,"").replace(/\)\s*$/,"").split(/\s*,\s*/g).map(n=>Number.parseFloat(n));const r=nums[0];const g=nums[1];const b=nums[2];if([r,g,b].every(n=>Number.isFinite(n)))return`rgba(${r},${g},${b},${a})`;}// Hex fallback
const rgb=hexToRgb(raw);if(!rgb)return`rgba(15,212,180,${a})`;return`rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;}function mixHex(hexA,hexB,t){const a=hexToRgb(hexA);const b=hexToRgb(hexB);if(!a||!b)return hexA;const tt=clamp(t,0,1);const r=Math.round(a.r+(b.r-a.r)*tt);const g=Math.round(a.g+(b.g-a.g)*tt);const b2=Math.round(a.b+(b.b-a.b)*tt);const toHex=n=>n.toString(16).padStart(2,"0");return`#${toHex(r)}${toHex(g)}${toHex(b2)}`;}function isValidEmail(v){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}function toPx(v,fallbackPx){if(typeof v==="number"&&Number.isFinite(v))return`${v}px`;if(typeof v==="string"){const s=v.trim();if(!s)return`${fallbackPx}px`;if(/^\d+(\.\d+)?px$/i.test(s))return s;const n=Number(s);if(Number.isFinite(n))return`${n}px`;return`${fallbackPx}px`;}return`${fallbackPx}px`;}function getFontFamily(v){const candidate=v?.fontFamily??v?.font?.fontFamily??v?.fontFamilyName??v?.family;return typeof candidate==="string"&&candidate.trim()?candidate:undefined;}function variantToWeight(variant){if(!variant)return undefined;const v=String(variant);if(v.includes("Thin"))return 100;if(v.includes("Extra Light"))return 200;if(v.includes("Light"))return 300;if(v.includes("Regular"))return 400;if(v.includes("Medium"))return 500;if(v.includes("Semibold"))return 600;if(v.includes("Extra Bold"))return 800;if(v.includes("Bold"))return 700;if(v.includes("Black"))return 900;return undefined;}function getFontWeight(v){return v?.fontWeight??variantToWeight(v?.variant)??v?.font?.fontWeight??variantToWeight(v?.font?.variant);}function getFontSizePx(v,fallback){const raw=v?.fontSize??v?.font?.fontSize;const resolved=typeof raw==="object"&&raw?raw?.value??raw?.size??raw?.px:raw;if(typeof resolved==="number"&&Number.isFinite(resolved))return`${resolved}px`;if(typeof resolved==="string")return toPx(resolved,fallback);return`${fallback}px`;}const PAGE_STYLE_BASE={width:"100%"};const DEFAULT_ROLE_OPTIONS=[{label:"Founder",desc:"Building a product or startup"},{label:"Designer",desc:"UX, product, or visual design"},{label:"Engineer",desc:"Frontend, backend, full-stack"},{label:"Product",desc:"Product management & strategy"},{label:"Marketing",desc:"Growth, content, or brand"},{label:"Other",desc:"Something else entirely"}];const DEFAULT_USE_CASE_OPTIONS=["Manage projects","Track sales","Internal wiki","Client portal","User onboarding","Analytics","Automations"];const DEFAULT_SOURCE_OPTIONS=["Twitter / X","Product Hunt","A friend or colleague","Google search","Newsletter","Other"];/**
 * @framerIntrinsicWidth 440
 * @framerIntrinsicHeight 580
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 *
 * @framerDisableUnlink
 */export default function MultiStepWaitlistForm(props){const{style}=props;const theme=props.theme;const typography=props.typography;const steps=props.steps;const submitSuccess=props.submitSuccess;const socialProof=props.socialProof;const colors=props.colors;const fonts=props.fonts;const labelTagBg=(colors?.labelTagBg??"").trim();const step1Text=props.step1Text;const step2Text=props.step2Text;const step3Text=props.step3Text;const step4Text=props.step4Text;const step4Options=props.step4Options;const step4PrivacyPolicy=props.step4PrivacyPolicy;const step5Text=props.step5Text;const darkMode=props.darkMode??theme?.darkMode??true;const accentColorRaw=colors?.accentColor??theme?.accentColor;const accentColor=useMemo(()=>{const v=(accentColorRaw??"").trim();if(v)return v;return darkMode?"#0fd4b4":"#0aaf96";},[accentColorRaw,darkMode]);const cardRadius=theme?.cardRadius??20;const body1FontAny=fonts?.body1;const body2FontAny=fonts?.body2;const titleFontAny=fonts?.title;const subtitleFontAny=fonts?.subtitle;// Body 1 applies to most text. Body 2 applies to form controls & buttons.
const resolvedBody1FontFamily=getFontFamily(body1FontAny)??getFontFamily(typography?.font)??getFontFamily((typography?.font)?.font)??"Manrope";const resolvedBody2FontFamily=getFontFamily(body2FontAny)??resolvedBody1FontFamily;const resolvedTitleFontFamily=getFontFamily(titleFontAny)??resolvedBody1FontFamily;const resolvedSubtitleFontFamily=getFontFamily(subtitleFontAny)??resolvedBody1FontFamily;const resolvedBody1Weight=getFontWeight(body1FontAny)??400;const resolvedBody2Weight=getFontWeight(body2FontAny)??resolvedBody1Weight;const resolvedBody1Size=getFontSizePx(body1FontAny,13);const resolvedBody2Size=getFontSizePx(body2FontAny,14);const body1SizeNum=useMemo(()=>{const n=Number.parseFloat(String(resolvedBody1Size));return Number.isFinite(n)?n:13;},[resolvedBody1Size]);const body2SizeNum=useMemo(()=>{const n=Number.parseFloat(String(resolvedBody2Size));return Number.isFinite(n)?n:14;},[resolvedBody2Size]);const metaSizePx=useMemo(()=>`${Math.max(9,body1SizeNum-2)}px`,[body1SizeNum]);const labelSizePx=useMemo(()=>`${Math.max(9,body1SizeNum-2)}px`,[body1SizeNum]);const smallSizePx=useMemo(()=>`${Math.max(10,body1SizeNum-1)}px`,[body1SizeNum]);const chipSizePx=useMemo(()=>`${Math.max(11,Math.round(body1SizeNum-.5))}px`,[body1SizeNum]);const buttonSizePx=useMemo(()=>`${Math.max(12,body2SizeNum)}px`,[body2SizeNum]);const resolvedHeadingSize=getFontSizePx(titleFontAny,26);const resolvedBodySize=getFontSizePx(subtitleFontAny??body1FontAny,13);const resolvedHeadingWeight=getFontWeight(titleFontAny)??800;const resolvedSubtitleWeight=getFontWeight(subtitleFontAny)??300;// Back-compat local aliases used by CSS variable wiring
const headingSize=resolvedHeadingSize;const bodySize=resolvedBodySize;const step1HeadingResolved=(step1Text?.title??steps?.step1Heading??"Create your account").trim()||"Create your account";const step1SubResolved=(step1Text?.subtitle??steps?.step1Sub??"Free for 14 days. No credit card required.").trim()||"Free for 14 days. No credit card required.";const step2HeadingResolved=(step2Text?.title??steps?.step2Heading??"What best describes you?").trim()||"What best describes you?";const step2SubResolved=(step2Text?.subtitle??steps?.step2Sub??"We'll personalise your setup based on how you work.").trim()||"We'll personalise your setup based on how you work.";const step3HeadingResolved=(step3Text?.title??steps?.step3Heading??"What are you here to do?").trim()||"What are you here to do?";const step3SubResolved=(step3Text?.subtitle??steps?.step3Sub??"Select all that apply — we'll tailor your experience.").trim()||"Select all that apply — we'll tailor your experience.";const step4HeadingResolved=(step4Text?.title??steps?.step4Heading??"Join the waitlist").trim()||"Join the waitlist";const step4SubResolved=(step4Text?.subtitle??steps?.step4Sub??"We're onboarding in batches — your spot is almost reserved.").trim()||"We're onboarding in batches — your spot is almost reserved.";const previewStep=props.previewStep??"";const effectivePreviewStep=previewStep;const ctaLabel=(step5Text?.buttonLabel??submitSuccess?.buttonLabel??"Join the waitlist").trim()||"Join the waitlist";const successTitle=(step5Text?.successHeading??submitSuccess?.successHeading??"You're on the list").trim()||"You're on the list";const successSub=(step5Text?.successMessage??submitSuccess?.successMessage??"We'll email {{email}} when your spot opens up. Usually within 1–2 weeks.").trim()||"We'll email {{email}} when your spot opens up. Usually within 1–2 weeks.";const positionLabel=(step5Text?.positionBadge??submitSuccess?.positionBadge??"Position #2,401 secured").trim()||"Position #2,401 secured";const showSocialProof=step4Options?.showSocialProof??socialProof?.show??true;const socialProofText=(step4Options?.socialProofText??socialProof?.text??"2,400+ people already on the list. New batch opening soon.").trim()||"2,400+ people already on the list. New batch opening soon.";const privacyPolicyLink=(step4PrivacyPolicy??"").trim()||"#";const peopleImages=useMemo(()=>{const defaults=[{src:"https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",alt:"Person 1"},{src:"https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg",alt:"Person 2"},{src:"https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg",alt:"Person 3"}];const incoming=Array.isArray(step4Options?.peopleImages)?step4Options?.peopleImages:[];const cleaned=incoming.filter(img=>img&&typeof img.src==="string"&&img.src.trim().length>0);const filled=[0,1,2].map(i=>cleaned[i]??defaults[i]);return filled;},[step4Options?.peopleImages]);const step1Label=(step1Text?.label??"Account setup").trim()||"Account setup";const step2Label=(step2Text?.label??"Your role").trim()||"Your role";const step3Label=(step3Text?.label??"Use case").trim()||"Use case";const step4Label=(step4Text?.label??"Final step").trim()||"Final step";const buildingLabel=(step4Text?.buildingLabel??"What are you building?").trim()||"What are you building?";const sourceLabel=(step4Text?.sourceLabel??"How did you hear about us?").trim()||"How did you hear about us?";// Keep existing defaults for visual settings not exposed in the panel
const cardBlur=24;const headingWeight=String(resolvedHeadingWeight);const bodyWeight=String(resolvedSubtitleWeight);const labelWeight="600";const inputSize=14;const cardPaddingX=36;const cardPaddingY=36;const fieldGap=13;const inputRadius=11;const buttonRadius=11;const chipRadius=100;const roleCardRadius=13;const shimmerVisible=true;const indicatorStyle=props.indicatorStyle??"bar";const DEFAULT_DARK_SUBTITLE="rgba(200,230,225,0.55)";const DEFAULT_DARK_BODY="rgba(200,230,225,0.7)";const DEFAULT_DARK_CARD="rgba(8,15,36,0.72)";// Detects whether the buyer has a dark mode default loaded in the Colors panel
// and clears it when switching to light mode so the built-in light fallbacks apply.
// Note: relies on hex string comparison — if Framer normalises to rgb() format
// this detection will fail silently and the dark color will bleed into light mode.
const rawColorHeading=(darkMode?colors?.titleColor??"":colors?.titleColorLight??colors?.titleColor??"").trim();const rawColorBody=(colors?.subtitleColor??"").trim();const rawBodyTextColor=(colors?.bodyTextColor??"").trim();const rawColorCard=(colors?.cardBackground??"").trim();// If the buyer switches to Light mode without touching the Colors panel, ignore the dark defaults
// so the component can use the built-in light fallbacks.
const colorHeading=rawColorHeading;const colorBody=!darkMode&&rawColorBody&&normColorString(rawColorBody)===normColorString(DEFAULT_DARK_SUBTITLE)?"":rawColorBody;const bodyTextColor=!darkMode&&rawBodyTextColor&&normColorString(rawBodyTextColor)===normColorString(DEFAULT_DARK_BODY)?"":rawBodyTextColor;const colorCard=!darkMode&&rawColorCard&&normColorString(rawColorCard)===normColorString(DEFAULT_DARK_CARD)?"":rawColorCard;const rootRef=useRef(null);const transitionTimerRef=useRef(null);const isRestartingRef=useRef(false);const roles=useMemo(()=>{const list=Array.isArray(props.roleCards)&&props.roleCards.length>0?props.roleCards:DEFAULT_ROLE_OPTIONS;return list;},[props.roleCards]);const chipsList=useMemo(()=>{const base=Array.isArray(props.useCaseChips)&&props.useCaseChips.length>0?props.useCaseChips:DEFAULT_USE_CASE_OPTIONS;return[...base.filter(label=>label!=="Other").map(label=>({label})),{label:"Other",isOther:true}];},[props.useCaseChips]);const teal=accentColor;const teal2=useMemo(()=>mixHex(teal,"#000000",.12),[teal]);const tealDark15=useMemo(()=>mixHex(teal,"#000000",.15),[teal]);const tealDim=useMemo(()=>rgba(teal,.18),[teal]);const tealGlow=useMemo(()=>rgba(teal,.08),[teal]);const tealBorder=useMemo(()=>rgba(teal,.25),[teal]);const borderFocus=useMemo(()=>rgba(teal,.45),[teal]);const cardBg=useMemo(()=>{const override=(colorCard||"").trim();if(override)return override;return darkMode?"rgba(8,15,36,0.72)":"rgba(255,255,255,0.82)";},[colorCard,darkMode]);const[currentStep,setCurrentStep]=useState(1);const[prevStep,setPrevStep]=useState(null);const[direction,setDirection]=useState("fwd");const[role,setRole]=useState("");const[otherOn,setOtherOn]=useState(false);const[chips,setChips]=useState([]);const[terms,setTerms]=useState(false);const[otherText,setOtherText]=useState("");const[success,setSuccess]=useState(false);useEffect(()=>{if(isRestartingRef.current)return;if(!effectivePreviewStep)return;startTransition(()=>{setPrevStep(null);setDirection("fwd");if(effectivePreviewStep==="success"){setCurrentStep(4);setSuccess(true);return;}const s=Number(effectivePreviewStep);if(s>=1&&s<=4){setSuccess(false);setCurrentStep(s);}});},[effectivePreviewStep,setCurrentStep,setPrevStep,setDirection,setSuccess]);const[email,setEmail]=useState("");const emailErr=useMemo(()=>email.length>5&&!isValidEmail(email),[email]);const[source,setSource]=useState("");const[firstName,setFirstName]=useState("");const[lastName,setLastName]=useState("");const[company,setCompany]=useState("");const[building,setBuilding]=useState("");const otherInputRef=useRef(null);const summaryName=useMemo(()=>{const nm=`${firstName} ${lastName}`.trim();return nm||"—";},[firstName,lastName]);const summaryCompany=useMemo(()=>company.trim()||"—",[company]);const summaryRole=useMemo(()=>role||"—",[role]);const summaryUseCases=useMemo(()=>{const all=[...chips];if(otherOn){const ot=(otherText||"").trim();all.push(ot||"Other");}return all;},[chips,otherOn,otherText]);const successEmail=useMemo(()=>email.trim()||"you",[email]);const computedChipCount=useMemo(()=>chips.length+(otherOn?1:0),[chips.length,otherOn]);const hiddenRoleValue=role||"";const hiddenUseCasesValue=useMemo(()=>{const all=[...chips];if(otherOn){const txt=(otherText||"").trim();all.push(txt||"Other");}return all.join(", ");},[chips,otherOn,otherText]);const goTo=useCallback(next=>{if(success)return;if(next===currentStep)return;const dir=next>currentStep?"fwd":"bk";startTransition(()=>{setPrevStep(currentStep);setDirection(dir);setCurrentStep(next);});if(typeof window!=="undefined"){if(transitionTimerRef.current)window.clearTimeout(transitionTimerRef.current);transitionTimerRef.current=window.setTimeout(()=>{transitionTimerRef.current=null;startTransition(()=>setPrevStep(null));},320);}else{startTransition(()=>setPrevStep(null));}},[currentStep,success]);useEffect(()=>{return()=>{if(transitionTimerRef.current&&typeof window!=="undefined"){window.clearTimeout(transitionTimerRef.current);}};},[]);const toggleChip=useCallback(label=>{startTransition(()=>{setChips(prev=>{const on=prev.includes(label);return on?prev.filter(c=>c!==label):[...prev,label];});});},[]);const toggleOther=useCallback(()=>{startTransition(()=>setOtherOn(v=>!v));},[]);useEffect(()=>{if(!otherOn)return;if(typeof window==="undefined")return;window.setTimeout(()=>otherInputRef.current?.focus(),0);},[otherOn]);const pickRole=useCallback(r=>{startTransition(()=>setRole(r));},[]);const toggleTerms=useCallback(()=>{startTransition(()=>setTerms(t=>!t));},[]);const doSubmit=useCallback(()=>{if(typeof window==="undefined")return;const form=rootRef.current?.closest("form");if(!form)return;if("requestSubmit"in form&&typeof form.requestSubmit==="function"){try{form.requestSubmit();}catch(_){// Form Stack validation may reject — don't show success
return;}}startTransition(()=>setSuccess(true));},[]);const restart=useCallback(()=>{isRestartingRef.current=true;// isRestartingRef is cleared in setTimeout to allow startTransition to commit
// before the preview effect can re-fire. Race condition is mitigated by the
// effectivePreviewStep dependency not changing during restart.
startTransition(()=>{setRole("");setChips([]);setOtherOn(false);setOtherText("");setTerms(false);setEmail("");setSource("");setBuilding("");setFirstName("");setLastName("");setCompany("");setSuccess(false);setPrevStep(null);setDirection("fwd");setCurrentStep(1);});if(typeof window!=="undefined"){window.setTimeout(()=>{isRestartingRef.current=false;},0);}else{isRestartingRef.current=false;}},[]);const pageMotion=useMemo(()=>{const duration=.3;const ease=[.4,0,.2,1];return{duration,ease};},[]);const renderPageStyle=useCallback(step=>{const isActive=currentStep===step;const isPrev=prevStep===step;const isVisible=isActive||isPrev;return{position:isActive?"relative":"absolute",top:0,left:0,width:"100%",opacity:isVisible?1:0,pointerEvents:isActive?"auto":"none",visibility:isVisible?"visible":"hidden"};},[currentStep,prevStep]);const renderMotionState=useCallback(step=>{// Avoid Step 4 being animated as active under the success overlay
if(success&&step===4)return{opacity:0,x:0};const isActive=currentStep===step;const isPrev=prevStep===step;const delta=16;if(isActive){return{opacity:1,x:0};}if(isPrev){return{opacity:0,x:direction==="bk"?delta:-delta};}return{opacity:0,x:direction==="bk"?-delta:delta};},[currentStep,prevStep,direction,success]);const progressSegClass=useCallback(i=>{if(i<currentStep)return"pseg done";if(i===currentStep)return"pseg now";return"pseg";},[currentStep]);const step4Style=renderPageStyle(4);const isRoleLocked=!role;const step2HintText=role?`${role} — ready to continue`:"Select a role to continue";const step2HintOk=!!role;const canContinueFromStep1=useMemo(()=>firstName.trim().length>0&&isValidEmail(email),[firstName,email]);return /*#__PURE__*/_jsxs("div",{ref:rootRef,className:"fw",style:{...style,position:"relative",width:"100%",maxWidth:"100%",color:"var(--t1)",["--card-blur"]:`${cardBlur}px`,["--card-radius"]:`${cardRadius}px`,["--card-padding-x"]:`${cardPaddingX}px`,["--card-padding-y"]:`${cardPaddingY}px`,["--body1-family"]:resolvedBody1FontFamily,["--body2-family"]:resolvedBody2FontFamily,["--body1-weight"]:String(resolvedBody1Weight),["--body2-weight"]:String(resolvedBody2Weight),["--body1-size"]:resolvedBody1Size,["--body2-size"]:resolvedBody2Size,["--meta-size"]:metaSizePx,["--label-size"]:labelSizePx,["--small-size"]:smallSizePx,["--chip-size"]:chipSizePx,["--button-size"]:buttonSizePx,["--font-family"]:resolvedBody1FontFamily,["--title-family"]:resolvedTitleFontFamily,["--subtitle-family"]:resolvedSubtitleFontFamily,["--heading-weight"]:headingWeight,["--body-weight"]:bodyWeight,["--label-weight"]:labelWeight,["--heading-size"]:headingSize,["--body-size"]:bodySize,["--input-size"]:`${inputSize}px`,["--field-gap"]:`${fieldGap}px`,["--input-radius"]:`${inputRadius}px`,["--button-radius"]:`${buttonRadius}px`,["--chip-radius"]:`${chipRadius}px`,["--role-card-radius"]:`${roleCardRadius}px`,["--teal"]:teal,["--teal2"]:teal2,["--tealDim"]:tealDim,["--tealGlow"]:tealGlow,["--tealBorder"]:tealBorder,["--borderFocus"]:borderFocus,["--labelTagBg"]:labelTagBg||(darkMode?"rgba(15,212,180,0.12)":"rgba(10,175,150,0.14)"),["--labelTagText"]:darkMode?teal:tealDark15,["--color-heading"]:(colorHeading||"").trim()||(darkMode?"#f0f7f5":"#0d1a18"),["--color-body"]:(colorBody||"").trim()||(darkMode?"rgba(200,230,225,0.55)":"rgba(13,26,24,0.55)"),["--btnText"]:darkMode?"#030d1a":"#ffffff",["--card-bg"]:cardBg,// Text
["--t1"]:darkMode?"#f0f7f5":"#0d1a18",["--t2"]:bodyTextColor?rgba(bodyTextColor,.75):darkMode?"rgba(200,230,225,0.7)":"rgba(13,26,24,0.68)",["--t3"]:bodyTextColor?rgba(bodyTextColor,.45):darkMode?"rgba(200,230,225,0.45)":"rgba(13,26,24,0.48)",["--t4"]:darkMode?"rgba(200,230,225,0.18)":"rgba(13,26,24,0.22)",["--tMuted"]:bodyTextColor?rgba(bodyTextColor,.3):darkMode?"rgba(200,230,225,0.28)":"rgba(13,26,24,0.28)",["--tHint"]:bodyTextColor?rgba(bodyTextColor,.22):darkMode?"rgba(200,230,225,0.18)":"rgba(13,26,24,0.18)",// Card
["--cardBg"]:cardBg,["--cardBorder"]:darkMode?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",["--cardShadow"]:darkMode?"0 0 0 1px rgba(255,255,255,0.03) inset, 0 32px 64px rgba(0,0,0,0.4)":"0 0 0 1px rgba(0,0,0,0.04) inset, 0 24px 48px rgba(0,0,0,0.10)",["--cardShimmer"]:darkMode?`linear-gradient(90deg,transparent,${rgba(teal,.4)},${rgba(teal,.2)},transparent)`:`linear-gradient(90deg,transparent,${rgba(teal,.3)},transparent)`,// Progress
["--pEmpty"]:darkMode?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)",["--pNow"]:darkMode?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",// Inputs
["--inputBg"]:darkMode?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",["--inputBorder"]:darkMode?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)",["--inputText"]:darkMode?"#e8f4f2":"#0d1a18",["--inputPlaceholder"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.28)",["--inputFocusBorder"]:darkMode?borderFocus:rgba(teal,.55),["--inputFocusBg"]:darkMode?tealGlow:rgba(teal,.05),["--inputFocusShadow"]:darkMode?tealGlow:rgba(teal,.1),["--inputErrBorder"]:darkMode?"rgba(239,68,68,.45)":"rgba(220,38,38,0.6)",// Select
["--selectUnfilled"]:darkMode?"rgba(232,244,242,0.35)":"rgba(13,26,24,0.4)",["--selectFilled"]:darkMode?"#e8f4f2":"#0d1a18",["--selectOptionBg"]:darkMode?"#07152e":"#ffffff",["--selectOptionText"]:darkMode?"#e8f4f2":"#0d1a18",// Role cards
["--roleBg"]:darkMode?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.03)",["--roleBorder"]:darkMode?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",["--roleHoverBg"]:darkMode?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)",["--roleHoverBorder"]:darkMode?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.14)",["--roleOnBg"]:darkMode?tealGlow:rgba(teal,.08),["--roleOnBorder"]:darkMode?tealBorder:rgba(teal,.4),["--roleName"]:darkMode?"rgba(232,244,242,0.6)":"rgba(15,14,13,0.65)",["--roleNameOn"]:darkMode?"#e8f4f2":"#0d1a18",["--roleDesc"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.35)",["--roleRadioBorder"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.22)",// Chips
["--chipBg"]:darkMode?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",["--chipBorder"]:darkMode?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.09)",["--chipText"]:darkMode?"rgba(232,244,242,0.6)":"rgba(15,14,13,0.6)",["--chipHoverBg"]:darkMode?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",["--chipHoverBorder"]:darkMode?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.15)",["--chipOnBg"]:darkMode?tealGlow:rgba(teal,.08),["--chipOnBorder"]:darkMode?tealBorder:rgba(teal,.35),["--chipOnText"]:darkMode?teal:teal,["--chipPip"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.22)",["--chipPipOn"]:darkMode?teal:teal,["--chipsNote"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.3)",// Summary
["--sumBg"]:darkMode?tealGlow:rgba(teal,.06),["--sumBorder"]:darkMode?tealBorder:rgba(teal,.18),["--sumHead"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.3)",["--sumRowBorder"]:darkMode?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",["--sumKey"]:darkMode?"rgba(232,244,242,0.35)":"rgba(15,14,13,0.45)",["--sumValue"]:darkMode?"#e8f4f2":"#0d1a18",["--sumChipBg"]:darkMode?tealGlow:rgba(teal,.08),["--sumChipBorder"]:darkMode?tealBorder:rgba(teal,.2),["--sumChipText"]:darkMode?teal:tealDark15,["--noneSelected"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.3)",// Social proof
["--socialBg"]:darkMode?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.03)",["--socialBorder"]:darkMode?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",["--socialText"]:darkMode?"rgba(232,244,242,0.35)":"rgba(15,14,13,0.4)",["--socialStrong"]:darkMode?"rgba(232,244,242,0.6)":"rgba(15,14,13,0.65)",["--avatarBorder"]:darkMode?"rgba(4,13,26,0.8)":"rgba(255,255,255,0.9)",["--a4Bg"]:darkMode?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",["--a4Text"]:darkMode?"rgba(232,244,242,0.35)":"rgba(15,14,13,0.4)",["--a4Border"]:darkMode?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",// Terms
["--termsText"]:darkMode?"rgba(232,244,242,0.35)":"rgba(15,14,13,0.4)",["--termsLink"]:darkMode?teal:tealDark15,["--termsBoxBorder"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.22)",["--termsBoxOn"]:darkMode?teal2:teal,// Divider
["--divider"]:darkMode?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",// Back button
["--backBg"]:darkMode?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",["--backBorder"]:darkMode?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.09)",["--backText"]:darkMode?"rgba(232,244,242,0.35)":"rgba(15,14,13,0.4)",["--backHoverBg"]:darkMode?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",["--backHoverBorder"]:darkMode?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.18)",["--backHoverText"]:darkMode?"rgba(232,244,242,0.6)":"rgba(15,14,13,0.7)",// Role hint
["--roleHint"]:darkMode?"rgba(232,244,242,0.18)":"rgba(15,14,13,0.3)",["--roleHintOk"]:darkMode?teal:tealDark15,// Error text
["--errText"]:darkMode?"rgba(239,100,100,.8)":"rgba(185,28,28,0.85)",// Success
["--successRingBg"]:darkMode?tealGlow:rgba(teal,.1),["--successRingBorder"]:darkMode?tealBorder:rgba(teal,.3),["--successRingIcon"]:darkMode?teal:teal,["--successSub"]:darkMode?"rgba(232,244,242,0.6)":"rgba(13,26,24,0.55)",["--successEm"]:darkMode?teal:tealDark15,["--posPillBg"]:darkMode?tealGlow:rgba(teal,.08),["--posPillBorder"]:darkMode?tealBorder:rgba(teal,.22),["--posPillText"]:darkMode?teal:tealDark15},children:[/*#__PURE__*/_jsx("style",{children:`
				.fw *,.fw *::before,.fw *::after{box-sizing:border-box;margin:0;padding:0}
				.fw{font-family:var(--body1-family, var(--font-family)),sans-serif;-webkit-font-smoothing:antialiased}

				.step-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
				.step-tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:100px;background: var(--labelTagBg);color: var(--labelTagText);font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:var(--meta-size, 11px);font-weight:var(--label-weight);letter-spacing:0.09em;text-transform:uppercase;opacity:1}
				.step-n{font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:var(--meta-size, 11px);font-weight:600;color: var(--t4)}
				.step-title{font-family:var(--title-family, var(--font-family)),sans-serif;font-size:var(--heading-size);font-weight:var(--heading-weight);letter-spacing:-0.03em;color: var(--color-heading);line-height:1.12;margin-bottom:8px}
				.step-sub{font-family:var(--subtitle-family, var(--font-family)),sans-serif;font-size:var(--body-size);color: var(--color-body);font-weight:var(--body-weight);line-height:1.65;margin-bottom:28px}

				.glass-card{
					background: var(--card-bg);
					border: 1px solid var(--cardBorder);
					border-radius: var(--card-radius);
					padding: var(--card-padding-y) var(--card-padding-x);
					backdrop-filter: blur(var(--card-blur));
					-webkit-backdrop-filter: blur(var(--card-blur));
					position: relative;
					box-shadow: var(--cardShadow);
					width: 100%;
					max-height: min(92svh, 100%);
					overflow-y: auto;
					touch-action: pan-y;
					overscroll-behavior: contain;
					scrollbar-width: none;
					-ms-overflow-style: none;
				}
				.glass-card::-webkit-scrollbar{display:none}

				.pages-wrap{min-height:0}

				/* Responsive tweaks */
				@media(max-width: 420px){
					.glass-card{padding: 28px 20px 24px;border-radius: var(--card-radius)}
					.prog{margin-bottom: 28px}
					.frow{flex-direction: column}
					.role-grid{grid-template-columns: 1fr}
					.footer{flex-direction: column}
					.btn-back,.btn-main{width: 100%}
				}

				.card-shimmer{
					position:absolute;top:0;left:44px;right:44px;height:1px;
					background: var(--cardShimmer);
				}

				.prog{display:flex;gap:5px;margin-bottom:36px;align-items:center;width:100%}
				.pdots{display:flex;flex:1;justify-content:center;gap:clamp(8px, 2vw, 12px);align-items:center;min-width:0;flex-wrap:nowrap}
				.pdot{flex:0 0 auto;width:clamp(10px, 1.3vw, 10px);height:clamp(10px, 1.3vw, 10px);border-radius:50%;background: var(--pEmpty);outline:1px solid rgba(255,255,255,0.12);outline-offset:-1px;transition: background .18s, transform .18s}
				.pdot.done{background: var(--teal);outline-color: transparent}
				.pdot.now{background: var(--teal2);outline-color: rgba(255,255,255,0.22);transform: scale(1.15)}
				.pnums{display:flex;flex:1;justify-content:center;gap:clamp(8px, 2vw, 12px);align-items:center;min-width:0;flex-wrap:nowrap}
				.pnum{flex:0 0 auto;width:clamp(22px, 3.2vw, 26px);height:clamp(22px, 3.2vw, 26px);border-radius:50%;display:flex;align-items:center;justify-content:center;background: var(--pEmpty);color: var(--t2);font-size:clamp(11px, 1.4vw, 12px);font-weight:600;transition: background .18s, color .18s, transform .18s}
				.pnum.done{background: var(--teal);color: #fff}
				.pnum.now{background: var(--teal2);color: #fff;transform: scale(1.05)}
				.pseg{flex:1;height:2px;border-radius:2px;background: var(--pEmpty);position:relative;overflow:hidden}

				@media(min-width: 421px) and (max-width: 768px){
					.pdots,.pnums{gap:clamp(10px, 2.4vw, 14px)}
					.pdot{width:clamp(10px, 1.4vw, 11px);height:clamp(10px, 1.4vw, 11px)}
					.pnum{width:clamp(22px, 3vw, 28px);height:clamp(22px, 3vw, 28px);font-size:clamp(11px, 1.2vw, 12px)}
				}

				.pseg.done{background: var(--teal)}
				.pseg.now{background: var(--pNow)}
				.pseg.now::after{content:'';position:absolute;inset:0;background: linear-gradient(90deg,var(--teal2), var(--teal));border-radius:2px;animation: pf .5s cubic-bezier(.4,0,.2,1) forwards}
				@keyframes pf{from{width:0}to{width:100%}}

				.fields{display:flex;flex-direction:column;gap:var(--field-gap);margin-bottom:24px}
				.frow{display:flex;gap:10px}
				.frow .field{flex:1;min-width:0}

				.field label{font-family:var(--body1-family, var(--font-family)),sans-serif;display:block;font-size:var(--label-size, 11px);font-weight:var(--label-weight);color: var(--t3);margin-bottom:7px;letter-spacing:0.05em;text-transform:uppercase}
				.field label .opt{font-weight:400;color: var(--t4);text-transform:none;letter-spacing:0}

				.field input,.field select,.field textarea{
					width:100%;
					background: var(--inputBg);
					border: 1px solid var(--inputBorder);
					border-radius: var(--input-radius);
					padding: 11px 14px;
					font-family:var(--body2-family, var(--body1-family, var(--font-family))),sans-serif;
					font-size:var(--body2-size, var(--input-size));font-weight:var(--body2-weight, 400);
					color: var(--inputText);
					outline:none;
					backdrop-filter: blur(8px);
					transition: border-color .18s, background .18s, box-shadow .18s;
					appearance:none;
				}
				.field input::placeholder,.field textarea::placeholder{color: var(--inputPlaceholder)}
				.field select{color: var(--selectUnfilled);cursor:pointer}
				.field select.filled{color: var(--selectFilled)}
				.field select option{background: var(--selectOptionBg);color: var(--selectOptionText)}

				.field input:focus,.field select:focus,.field textarea:focus{
					border-color: var(--inputFocusBorder);
					background: var(--inputFocusBg);
					box-shadow: 0 0 0 3px var(--inputFocusShadow);
				}

				.field input.err{border-color: var(--inputErrBorder)}
				.err-txt{font-size:11px;color: var(--errText);margin-top:5px;display:none}
				.field input.err ~ .err-txt{display:block}
				.field textarea{resize:none;line-height:1.65}

				.role-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}

				.rcard{
					background: var(--roleBg);
					border: 1px solid var(--roleBorder);
					border-radius: var(--role-card-radius);
					padding: 14px;
					cursor:pointer;user-select:none;
					display:flex;flex-direction:column;gap:10px;
					backdrop-filter: blur(8px);
					transition: border-color .18s, background .18s;
				}
				.rcard:hover{border-color: var(--roleHoverBorder);background: var(--roleHoverBg)}
				.rcard.on{border-color: var(--roleOnBorder);background: var(--roleOnBg)}
				.rcard-top{display:flex;justify-content:space-between;align-items:flex-start}

				.rcard-radio{width:16px;height:16px;border-radius:50%;border: 1.5px solid var(--roleRadioBorder);display:flex;align-items:center;justify-content:center;transition:border-color .18s;flex-shrink:0}
				.rcard.on .rcard-radio{border-color: var(--teal)}

				.rcard-dot{width:7px;height:7px;border-radius:50%;background: var(--teal);opacity:0;transform: scale(0);transition: opacity .14s, transform .14s}
				.rcard.on .rcard-dot{opacity:1;transform: scale(1)}

				.rcard-name{font-size:13px;font-weight:600;color: var(--roleName);transition: color .18s}
				.rcard.on .rcard-name{color: var(--roleNameOn)}
				.rcard-desc{font-size:11px;color: var(--roleDesc);line-height:1.5;font-weight:400}

				.role-hint{font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:var(--small-size, 12px);color: var(--roleHint);margin-bottom:20px;min-height:16px;transition: color .2s}
				.role-hint.ok{color: var(--roleHintOk)}

				.chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px}
				.chip{
					display:inline-flex;align-items:center;gap:6px;
					padding:7px 13px;
					background: var(--chipBg);
					border:1px solid var(--chipBorder);
					border-radius:var(--chip-radius);
					font-size:var(--chip-size, 12.5px);font-weight:500;
					color: var(--chipText);
					cursor:pointer;user-select:none;
					backdrop-filter: blur(8px);
					transition: all .16s;
				}
				.chip:hover{border-color: var(--chipHoverBorder);background: var(--chipHoverBg)}
				.chip.on{background: var(--chipOnBg);border-color: var(--chipOnBorder);color: var(--chipOnText)}
				.chip-pip{width:5px;height:5px;border-radius:50%;background: var(--chipPip);flex-shrink:0;transition: background .16s}
				.chip.on .chip-pip{background: var(--chipPipOn)}

				.chips-foot{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
				.chips-note{font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:var(--small-size, 12px);color: var(--chipsNote)}
				.chips-badge{
					font-size:10.5px;font-weight:600;
					color: var(--teal);
					background: var(--tealGlow);
					border: 1px solid var(--tealBorder);
					border-radius:4px;padding:2px 8px;
				}

				.other-drop{max-height:0;overflow:hidden;opacity:0;transition: max-height .28s ease, opacity .28s ease, margin .28s;margin-bottom:0}
				.other-drop.open{max-height:60px;opacity:1;margin-bottom:12px}
				.other-drop input{
					width:100%;
					background: var(--inputBg);
					border: 1px solid var(--inputFocusBorder);
					border-radius: var(--input-radius);
					padding: 11px 14px;
					font-family:var(--body2-family, var(--body1-family, var(--font-family))),sans-serif;
					font-size:var(--body2-size, var(--input-size));color: var(--inputText);
					outline:none;backdrop-filter: blur(8px);
				}
				.other-drop input::placeholder{color: var(--inputPlaceholder)}
				.other-drop input:focus{box-shadow: 0 0 0 3px var(--inputFocusShadow)}

				.summary{
					background: var(--sumBg);
					border: 1px solid var(--sumBorder);
					border-radius: 13px;
					padding: 15px;
					margin-bottom: 18px;
					backdrop-filter: blur(8px);
				}
				.sum-head{font-size:10px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color: var(--sumHead);margin-bottom:12px}
				.sum-row{display:flex;justify-content:space-between;align-items:flex-start;padding: 7px 0;border-bottom:1px solid var(--sumRowBorder);gap:12px}
				.sum-row:last-child{border-bottom:none;padding-bottom:0}
				.sum-k{font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:12px;color: var(--sumKey);white-space:nowrap;flex-shrink:0}
				.sum-v{font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:12px;color: var(--sumValue);font-weight:600;text-align:right;line-height:1.5}
				.sum-chips{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:4px}
				.sum-chip{font-size:11px;padding:2px 9px;background: var(--sumChipBg);border:1px solid var(--sumChipBorder);border-radius:20px;color: var(--sumChipText)}

				.social{
					display:flex;align-items:center;gap:11px;
					padding: 11px 14px;
					background: var(--socialBg);
					border:1px solid var(--socialBorder);
					border-radius:10px;margin-bottom:18px;
					backdrop-filter: blur(8px);
				}
				.avs{display:flex}
				.av{width:24px;height:24px;border-radius:50%;border:1.5px solid var(--avatarBorder);display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:700;margin-left:-6px;color: rgba(255,255,255,0.85)}
				.av:first-child{margin-left:0}
				.av img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}
				.a1{background:#0d5a4e}
				.a2{background:#0a7a68}
				.a3{background:#0d9e88}
				.a4{background: var(--a4Bg);color: var(--a4Text);border-color: var(--a4Border)}
				.social-txt{font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:var(--small-size, 12px);color: var(--socialText);line-height:1.5}
				.social-txt strong{color: var(--socialStrong);font-weight:600}

				.terms-row{display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px}
				.terms-box{width:16px;height:16px;border-radius:5px;border: 1.5px solid var(--termsBoxBorder);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition: background .15s,border-color .15s;font-size:9px;color:#fff;backdrop-filter: blur(4px)}
				.terms-row.on .terms-box{background: var(--termsBoxOn);border-color: var(--termsBoxOn)}
				.terms-copy{font-family:var(--body1-family, var(--font-family)),sans-serif;font-size:var(--small-size, 12px);color: var(--termsText);line-height:1.65;font-weight:400}
				.terms-copy a{color: var(--termsLink);text-decoration:none;opacity:0.8}
				.terms-copy a:hover{opacity:1}

				.divider{height:1px;background: var(--divider);margin: 2px 0 18px}

				.footer{display:flex;gap:8px}
				.btn-back{
					display:flex;align-items:center;gap:5px;
					background: var(--backBg);
					border:1px solid var(--backBorder);
					border-radius:var(--button-radius);padding: 11px 18px;
					font-family:var(--body2-family, var(--body1-family, var(--font-family))),sans-serif;
					font-size:var(--button-size, var(--body2-size, 13.5px));font-weight:var(--body2-weight, 500);
					color: var(--backText);
					cursor:pointer;
					backdrop-filter: blur(8px);
					transition: border-color .18s,color .18s,background .18s;
					white-space:nowrap;
				}
				.btn-back:hover{border-color: var(--backHoverBorder);color: var(--backHoverText);background: var(--backHoverBg)}

				.btn-main{
					flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
					background: var(--teal2);
					border:none;border-radius:var(--button-radius);
					padding: 12px 24px;
					font-family:var(--body2-family, var(--body1-family, var(--font-family))),sans-serif;
					font-size:var(--button-size, var(--body2-size, 14px));font-weight:var(--body2-weight, 700);
					color: var(--btnText);
					cursor:pointer;
					transition: background .18s, transform .12s, opacity .18s;
					letter-spacing:-0.01em;
					position:relative;overflow:hidden;
				}
				.btn-main::before{content:'';position:absolute;inset:0;background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);pointer-events:none}
				.btn-main:hover{background: var(--teal)}
				.btn-main:active{transform: scale(0.985)}
				.btn-main.locked{opacity:0.28;pointer-events:none}
				.arr{display:inline-block;transition: transform .18s}
				.btn-main:hover .arr{transform: translateX(3px)}

				.success-ring{width:56px;height:56px;border-radius:50%;background: var(--successRingBg);border:1px solid var(--successRingBorder);display:flex;align-items:center;justify-content:center;margin-bottom:22px;font-size:22px;color: var(--successRingIcon)}
				.success-title{font-family:var(--title-family, var(--font-family)),sans-serif;font-size:var(--heading-size);font-weight:var(--heading-weight);letter-spacing:-0.03em;color: var(--color-heading);margin-bottom:10px;line-height:1.1}
				.success-sub{font-size:14px;color: var(--successSub);font-weight:300;line-height:1.65;margin-bottom:22px}
				.success-sub em{color: var(--successEm);font-style:normal;font-weight:600}
				.pos-pill{display:inline-flex;align-items:center;gap:7px;padding: 7px 18px;background: var(--posPillBg);border:1px solid var(--posPillBorder);border-radius:100px;font-size:12px;color: var(--posPillText);font-weight:600;margin-bottom:28px}

				.success-wrap{position:absolute;inset:0;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:10}
			`}),/*#__PURE__*/_jsxs("div",{className:"glass-card",children:[shimmerVisible&&/*#__PURE__*/_jsx("div",{className:"card-shimmer",style:{background:"var(--cardShimmer)"}}),/*#__PURE__*/_jsx("div",{className:"prog",style:{display:success?"none":"flex"},"aria-hidden":success?true:undefined,children:(()=>{if(indicatorStyle==="dots"){return /*#__PURE__*/_jsx("div",{className:"pdots","aria-label":"Progress",children:[1,2,3,4].map(s=>{const done=s<currentStep;const now=s===currentStep;return /*#__PURE__*/_jsx("span",{className:"pdot"+(done?" done":now?" now":"")},s);})});}if(indicatorStyle==="numbers"){return /*#__PURE__*/_jsx("div",{className:"pnums","aria-label":"Progress",children:[1,2,3,4].map(s=>{const done=s<currentStep;const now=s===currentStep;return /*#__PURE__*/_jsx("span",{className:"pnum"+(done?" done":now?" now":""),children:s},s);})});}return /*#__PURE__*/_jsxs(_Fragment,{children:[/*#__PURE__*/_jsx("div",{className:progressSegClass(1)}),/*#__PURE__*/_jsx("div",{className:progressSegClass(2)}),/*#__PURE__*/_jsx("div",{className:progressSegClass(3)}),/*#__PURE__*/_jsx("div",{className:progressSegClass(4)})
                        ]});})()}),/*#__PURE__*/_jsx("input",{type:"hidden",name:"Role",value:hiddenRoleValue}),/*#__PURE__*/_jsx("input",{type:"hidden",name:"Use-Cases",value:hiddenUseCasesValue}),/*#__PURE__*/_jsx("input",{type:"hidden",name:"Use-Cases-Count",value:String(computedChipCount)}),/*#__PURE__*/_jsxs("div",{className:"pages-wrap",style:{position:"relative",overflow:"hidden"},children:[/*#__PURE__*/_jsxs(motion.div,{style:{...PAGE_STYLE_BASE,...renderPageStyle(1)},animate:renderMotionState(1),transition:pageMotion,children:[/*#__PURE__*/_jsxs("div",{className:"step-meta",children:[/*#__PURE__*/_jsx("span",{className:"step-tag",children:step1Label}),/*#__PURE__*/_jsx("span",{className:"step-n",children:"1 / 4"})]}),/*#__PURE__*/_jsx("div",{className:"step-title",children:step1HeadingResolved}),/*#__PURE__*/_jsx("div",{className:"step-sub",children:step1SubResolved}),/*#__PURE__*/_jsxs("div",{className:"fields",children:[/*#__PURE__*/_jsxs("div",{className:"frow",children:[/*#__PURE__*/_jsxs("div",{className:"field",children:[/*#__PURE__*/_jsx("label",{htmlFor:"fn","children":"First name"}),/*#__PURE__*/_jsx("input",{id:"fn",type:"text",placeholder:"Enter your first name",value:firstName,onChange:e=>startTransition(()=>setFirstName(e.target.value))})]}),/*#__PURE__*/_jsxs("div",{className:"field",children:[/*#__PURE__*/_jsx("label",{htmlFor:"ln","children":"Last name"}),/*#__PURE__*/_jsx("input",{id:"ln",type:"text",placeholder:"Enter your last name",value:lastName,onChange:e=>startTransition(()=>setLastName(e.target.value))})]})]}),/*#__PURE__*/_jsxs("div",{className:"field",children:[/*#__PURE__*/_jsx("label",{htmlFor:"em","children":"Email"}),/*#__PURE__*/_jsx("input",{id:"em",type:"email",placeholder:"you@company.com",value:email,onChange:e=>startTransition(()=>setEmail(e.target.value)),className:emailErr?"err":""}),/*#__PURE__*/_jsx("div",{className:"err-txt","children":"Please enter a valid email"})]}),/*#__PURE__*/_jsxs("div",{className:"field",children:[/*#__PURE__*/_jsx("label",{htmlFor:"co","children":"Company",children:[/*#__PURE__*/_jsx("span",{className:"opt","children":"(optional)"})]}),/*#__PURE__*/_jsx("input",{id:"co",type:"text",placeholder:"e.g. Acme Inc.",value:company,onChange:e=>startTransition(()=>setCompany(e.target.value))})]})]}),/*#__PURE__*/_jsxs("div",{className:"footer",children:[/*#__PURE__*/_jsx("div",{className:"divider",style:{height:0,margin:0}}),/*#__PURE__*/_jsx("button",{className:"btn-main"+(canContinueFromStep1?"":" locked"),onClick:()=>goTo(2),disabled:!canContinueFromStep1,"children":"Continue",children:[/*#__PURE__*/_jsx("span",{className:"arr","children":"→"})]})]})]}),/*#__PURE__*/_jsxs(motion.div,{style:{...PAGE_STYLE_BASE,...renderPageStyle(2)},animate:renderMotionState(2),transition:pageMotion,children:[/*#__PURE__*/_jsxs("div",{className:"step-meta",children:[/*#__PURE__*/_jsx("span",{className:"step-tag",children:step2Label}),/*#__PURE__*/_jsx("span",{className:"step-n","children":"2 / 4"})]}),/*#__PURE__*/_jsx("div",{className:"step-title",children:step2HeadingResolved}),/*#__PURE__*/_jsx("div",{className:"step-sub",children:step2SubResolved}),/*#__PURE__*/_jsx("div",{className:"role-grid","aria-label":"Role selection",children:roles.map((r,i)=>{const isOn=r.label===role;return/*#__PURE__*/_jsxs("div",{className:"rcard"+(isOn?" on":""),onClick:()=>pickRole(r.label),role:"radio","aria-checked":isOn,tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&pickRole(r.label)},children:[/*#__PURE__*/_jsxs("div",{className:"rcard-top",children:[/*#__PURE__*/_jsx("div",{className:"rcard-name","children":r.label}),/*#__PURE__*/_jsxs("div",{className:"rcard-radio",children:[/*#__PURE__*/_jsx("div",{className:"rcard-dot"})]})]}),/*#__PURE__*/_jsx("div",{className:"rcard-desc","children":r.desc})]},i);})}),/*#__PURE__*/_jsx("div",{className:"role-hint"+(step2HintOk?" ok":""),children:step2HintText}),/*#__PURE__*/_jsxs("div",{className:"footer",children:[/*#__PURE__*/_jsx("button",{className:"btn-back",onClick:()=>goTo(1),"children":"← Back"}),/*#__PURE__*/_jsx("button",{className:"btn-main"+(isRoleLocked?" locked":""),onClick:()=>goTo(3),disabled:isRoleLocked,"children":"Continue",children:[/*#__PURE__*/_jsx("span",{className:"arr","children":"→"})]})]})]}),/*#__PURE__*/_jsxs(motion.div,{style:{...PAGE_STYLE_BASE,...renderPageStyle(3)},animate:renderMotionState(3),transition:pageMotion,children:[/*#__PURE__*/_jsxs("div",{className:"step-meta",children:[/*#__PURE__*/_jsx("span",{className:"step-tag",children:step3Label}),/*#__PURE__*/_jsx("span",{className:"step-n","children":"3 / 4"})]}),/*#__PURE__*/_jsx("div",{className:"step-title",children:step3HeadingResolved}),/*#__PURE__*/_jsx("div",{className:"step-sub",children:step3SubResolved}),/*#__PURE__*/_jsx("div",{className:"chips","aria-label":"Use cases",children:chipsList.map((item,j)=>{const isOn=chips.includes(item.label);return/*#__PURE__*/_jsxs("div",{className:"chip"+(isOn?" on":""),onClick:()=>{if(item.isOther){toggleOther();}else{toggleChip(item.label);}},role:"checkbox","aria-checked":item.isOther?otherOn:isOn,tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(item.isOther?toggleOther():toggleChip(item.label))},children:[/*#__PURE__*/_jsx("span",{className:"chip-pip"}),item.label]},j);})}),/*#__PURE__*/_jsxs("div",{className:"other-drop"+(otherOn?" open":""),children:[/*#__PURE__*/_jsx("input",{ref:otherInputRef,type:"text",placeholder:"Describe your use case…",value:otherText,onChange:e=>startTransition(()=>setOtherText(e.target.value))})]}),/*#__PURE__*/_jsxs("div",{className:"chips-foot",children:[/*#__PURE__*/_jsx("div",{className:"chips-note",children:computedChipCount>0?`${computedChipCount} selected`:"Select any that apply"}),computedChipCount>0&&/*#__PURE__*/_jsx("div",{className:"chips-badge",children:`${computedChipCount} selected`})]}),/*#__PURE__*/_jsxs("div",{className:"footer",children:[/*#__PURE__*/_jsx("button",{className:"btn-back",onClick:()=>goTo(2),"children":"← Back"}),/*#__PURE__*/_jsx("button",{className:"btn-main",onClick:()=>goTo(4),"children":"Continue",children:[/*#__PURE__*/_jsx("span",{className:"arr","children":"→"})]})]})]}),/*#__PURE__*/_jsxs(motion.div,{style:{...PAGE_STYLE_BASE,...step4Style},animate:renderMotionState(4),transition:pageMotion,children:[/*#__PURE__*/_jsxs("div",{className:"step-meta",children:[/*#__PURE__*/_jsx("span",{className:"step-tag",children:step4Label}),/*#__PURE__*/_jsx("span",{className:"step-n","children":"4 / 4"})]}),/*#__PURE__*/_jsx("div",{className:"step-title",children:step4HeadingResolved}),/*#__PURE__*/_jsx("div",{className:"step-sub",children:step4SubResolved}),/*#__PURE__*/_jsxs("div",{className:"fields",children:[/*#__PURE__*/_jsxs("div",{className:"field",children:[/*#__PURE__*/_jsx("label",{htmlFor:"build","children":buildingLabel}),/*#__PURE__*/_jsx("input",{id:"build",type:"text",placeholder:"What are you building?",value:building,onChange:e=>startTransition(()=>setBuilding(e.target.value))})]}),/*#__PURE__*/_jsxs("div",{className:"field",children:[/*#__PURE__*/_jsx("label",{htmlFor:"src","children":sourceLabel}),/*#__PURE__*/_jsx("select",{id:"src",value:source,onChange:e=>startTransition(()=>setSource(e.target.value)),className:source?"filled":"",children:[/*#__PURE__*/_jsx("option",{value:"","disabled":"","children":"Select one"}),...DEFAULT_SOURCE_OPTIONS.map(o=>/*#__PURE__*/_jsx("option",{value:o,"children":o},o))]})]})]}),/*#__PURE__*/_jsxs("div",{className:"summary",children:[/*#__PURE__*/_jsx("div",{className:"sum-head","children":"Summary"}),/*#__PURE__*/_jsxs("div",{className:"sum-row",children:[/*#__PURE__*/_jsx("span",{className:"sum-k","children":"Name"}),/*#__PURE__*/_jsx("span",{className:"sum-v","children":summaryName})]}),/*#__PURE__*/_jsxs("div",{className:"sum-row",children:[/*#__PURE__*/_jsx("span",{className:"sum-k","children":"Company"}),/*#__PURE__*/_jsx("span",{className:"sum-v","children":summaryCompany})]}),/*#__PURE__*/_jsxs("div",{className:"sum-row",children:[/*#__PURE__*/_jsx("span",{className:"sum-k","children":"Role"}),/*#__PURE__*/_jsx("span",{className:"sum-v","children":summaryRole})]}),/*#__PURE__*/_jsxs("div",{className:"sum-row",children:[/*#__PURE__*/_jsx("span",{className:"sum-k","children":"Use cases"}),/*#__PURE__*/_jsx("span",{className:"sum-v","children":summaryUseCases.length>0?/*#__PURE__*/_jsx("span",{className:"sum-chips","children":summaryUseCases.map(uc=>/*#__PURE__*/_jsx("span",{className:"sum-chip","children":uc},uc))}):/*#__PURE__*/_jsx("span",{style:{color:"var(--noneSelected)"},"children":"None selected"})})]})]}),showSocialProof&&/*#__PURE__*/_jsxs("div",{className:"social",children:[/*#__PURE__*/_jsxs("div",{className:"avs",children:[/*#__PURE__*/_jsx("div",{className:"av a1","children":/*#__PURE__*/_jsx("img",{src:peopleImages[0]?.src,alt:peopleImages[0]?.alt})}),/*#__PURE__*/_jsx("div",{className:"av a2","children":/*#__PURE__*/_jsx("img",{src:peopleImages[1]?.src,alt:peopleImages[1]?.alt})}),/*#__PURE__*/_jsx("div",{className:"av a3","children":/*#__PURE__*/_jsx("img",{src:peopleImages[2]?.src,alt:peopleImages[2]?.alt})}),/*#__PURE__*/_jsx("div",{className:"av a4","children":"+100"})]}),/*#__PURE__*/_jsx("div",{className:"social-txt",dangerouslySetInnerHTML:{__html:socialProofText.replace(/(\d[\d,+]+\+?)\s*(people)/,'<strong>$1 $2</strong>')}})]}),/*#__PURE__*/_jsxs("div",{className:"terms-row"+(terms?" on":""),onClick:toggleTerms,role:"checkbox","aria-checked":terms,tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&toggleTerms()},children:[/*#__PURE__*/_jsx("div",{className:"terms-box",children:terms?"✓":""}),/*#__PURE__*/_jsxs("div",{className:"terms-copy",children:["I agree to the ",/*#__PURE__*/_jsx("a",{href:privacyPolicyLink,target:"_blank",rel:"noopener noreferrer","children":"Privacy Policy"})," and Terms of Service"]})]}),/*#__PURE__*/_jsxs("div",{className:"footer",children:[/*#__PURE__*/_jsx("button",{className:"btn-back",onClick:()=>goTo(3),"children":"← Back"}),/*#__PURE__*/_jsx("button",{className:"btn-main"+(terms?"":" locked"),disabled:!terms,onClick:doSubmit,"children":ctaLabel,children:[/*#__PURE__*/_jsx("span",{className:"arr","children":"→"})]})]})]}),success&&/*#__PURE__*/_jsxs("div",{className:"success-wrap",children:[/*#__PURE__*/_jsx("div",{className:"success-ring","children":"✓"}),/*#__PURE__*/_jsx("div",{className:"success-title",children:successTitle}),/*#__PURE__*/_jsx("div",{className:"success-sub",dangerouslySetInnerHTML:{__html:successSub.replace(/\{\{email\}\}/g,`<em>${successEmail}</em>`)}}),/*#__PURE__*/_jsx("div",{className:"pos-pill","children":positionLabel}),/*#__PURE__*/_jsx("button",{className:"btn-main",style:{background:"var(--teal2)",maxWidth:"200px"},onClick:restart,"children":"Start over",children:[/*#__PURE__*/_jsx("span",{className:"arr","children":"→"})]})]})]})]})]});}
