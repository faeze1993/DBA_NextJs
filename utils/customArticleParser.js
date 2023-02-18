import React, { useEffect, useState } from "react";
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

export const CustomeArticleParser = ({ content }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [Str, setStr] = useState();
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    // document.querySelectorAll('pre > code').forEach(function (codeBlock) {
      
    //     console.info("codeBlock", codeBlock);
    //     var button = document.createElement('button');
    //     button.className = 'copy-code-button';
    //     button.type = 'button';
    //     button.innerText = 'Copy';
       

    //     var pre = codeBlock.parentNode;
    //     console.info("pre", pre,pre.parentNode.classList);
    //     if (pre.parentNode.classList.contains('hljs')) {
    //         console.info("pre if");
    //         var highlight = pre.parentNode;
    //         highlight.parentNode.insertBefore(button, highlight);
    //     } else {
    //         console.info("pre else if");
    //         pre.parentNode.insertBefore(button, pre);
    //     }
    // });
    // var clipboardBtn = document.getElementById("clipboardbutton");
    // useEffect(() => {
    //     // console.info("clipboardBtn",clipboardBtn);
    //     if(clipboardBtn){
    //         console.info("i`m hereeee");
    //         clipboardBtn.addEventListener('click', copyToClipboard, false);
    //     }

     
    // }, [clipboardBtn])


    // const copyToClipboard = () => {
    //     console.info("jjjjjjjjjjjjjjj")
    //     var hideSpan = document.getElementsByClassName("hidespan");
    //     console.info("hideSpan",hideSpan,hideSpan[0].innerText)
    //     var text = hideSpan[0].innerText;
    //     navigator.clipboard.writeText(text)
    // }
   
    const mdParser = new MarkdownIt(
        {
                html: true,
                linkify: true,
                typographer: true,
                // highlight: function (str, lang) {
                //     if (lang && hljs.getLanguage(lang)) {
                //         try {
                //             return '<pre class="hljs"><code>' +
                //                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                //                 '</code></pre>'
                //                 ;
                //         } catch (__) { }
                //     }
            
                //     return '<pre className="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
                // }
            }
    );

    
    return (
        <>

            <div dangerouslySetInnerHTML={{ __html: mdParser.render(content) }} />
        </>

    );
}



// {
//     html: true,
//     linkify: true,
//     typographer: true,
//     highlight: function (str, lang) {
//         if (lang && hljs.getLanguage(lang)) {
//             try {
//                 return '<pre className="hljs"><code>' +
//                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
//                     '</code></pre>' +
//                     ' <CopyToClipboard text=' + {content} + 'onCopy=' + {onCopyText} +'>' +
//                     '<span> <Copy/></span>' +
//                     '</CopyToClipboard>'
//                     ;
//             } catch (__) { }
//         }

//         return '<pre className="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
//     }
// }

// {
//     html: true,
//     linkify: true,
//     typographer: true,
//     highlight: function (str, lang) {
        
       
//         if (lang && hljs.getLanguage(lang)) {
//             try {
//                 return  '<span class="hidespan"> '+str+'</span>'+'<div><span class="clipboardbutton"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span></div>' + 
//                 '<pre className="hljs"><code>' +
//                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
//                     '</code></pre> '
//                     ;
//             } catch (__) { }
//         }

//         return  '<span class="hidespan"> '+str+'</span>'+'<div><span id="clipboardbutton"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span></div>'
//          + '<pre className="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
//     }
// }