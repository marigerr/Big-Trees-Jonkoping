// // export function getStamomkretCond(stamomkretSel) {
// //     // console.log("Stamomkret input is " + stamomkretSel);
// //     return stamomkretSel == "100" ? "Stamomkret > 0" :
// //            stamomkretSel == "1" ? "Stamomkret BETWEEN 0 AND 250" :
// //            stamomkretSel == "2" ? "Stamomkret BETWEEN 251 AND 500" :
// //            stamomkretSel == "5" ? "Stamomkret BETWEEN 501 AND 750" :
// //            stamomkretSel == "7" ? "Stamomkret BETWEEN 751 AND 1000" :
// //            stamomkretSel == "10" ? "Stamomkret > 1000" :
// //            "Stamomkret > 0";
// // }

// // export function getKommunCond(kommunSel) {
// //     return kommunSel == "All" ? "Kommun IS NOT NULL" : "Kommun='" + kommunSel + "'";
// // }

// export function getTradslagCond(tradslagSel) {
//     return tradslagSel == "Al" ? "Tradslag like '%Al'" :
//         tradslagSel == "Alm" ? "Tradslag like '%Alm%'" :
//         tradslagSel == "Ask" ? "Tradslag like '%Ask%'" :
//         tradslagSel == "Äpple" ? "(Tradslag like '%Apel%' OR Tradslag like '%Äpple%')" :
//         tradslagSel == "Avenbok" ? "Tradslag like '%Avenbok%'" :
//         tradslagSel == "Björk" ? "Tradslag like '%Björk%'" :
//         tradslagSel == "Bok" ? "Tradslag like '%Bok%'" :
//         tradslagSel == "Ek" ? "Tradslag like '%Ek%'" :
//         tradslagSel == "En" ? "Tradslag='En' OR Tradslag='Kungsen" :
//         tradslagSel == "Gran" ? "Tradslag like '%Gran%'" :
//         tradslagSel == "Hassel" ? "Tradslag like '%Hassel%'" :
//         tradslagSel == "Hagtorn" ? "Tradslag like '%Hagtorn%'" :
//         tradslagSel == "Idegran" ? "Tradslag='Idegran'" :
//         tradslagSel == "Körsbär" ? "Tradslag like '%Körsbär%'" :
//         tradslagSel == "Kastanj" ? "Tradslag like '%Kastanj'" :
//         tradslagSel == "Lärk" ? "Tradslag like '%Lärk'" :
//         tradslagSel == "Lönn" ? "Tradslag like '%Lönn'" :
//         tradslagSel == "Lind" ? "Tradslag like '%Lind%'" :
//         tradslagSel == "Oxel" ? "Tradslag like 'Oxel'" :
//         tradslagSel == "Päron" ? "Tradslag like 'Päron'" :
// //    tradslagSel == "Avenbok" ? "Tradslag like '%Avenbok%'" :
// //    tradslagSel == "Avenbok" ? "Tradslag like '%Avenbok%'" :
//         "Tradslag IS NOT NULL";
// }