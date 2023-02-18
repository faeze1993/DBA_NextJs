// import pako from "pako";

export const articlesForArchiveReduser = (state = {}, action) => {
    switch (action.type) {
        case "INIT":
            return {...action.payload};
        case "ADD_ARTICLE":
            return {...action.payload};
        case "DELETE_ARTICLE":
            return {...action.payload};
        case "UPDATE_ARTICLE":
            return {...action.payload};
        default:
            return state;
    }
}

export const articleForDashboardReduser = (state = {}, action) => {
    switch (action.type) {
        case "GET-ARTICLESFORDASHBOARD":
            return {...action.payload};
        default:
            return state;
    }
}

export const authorArticlesReduser = (state = {}, action) => {
    switch (action.type) {
        case "GET_AUTHORARTICLES":
            return {...action.payload};
        default:
            return state;
    }
}

export const articleForMainPageReduser = (state = {}, action) => {
    switch (action.type) {
        case "GET-ARTICLESFORMAINPAGE":
            return {...action.payload};
        default:
            return state;
    }
}
export const articleTypesReduser = (state = [], action) => {
    switch (action.type) {
        case "GET_ARTICLETYPE":
            return [...action.payload];
        default:
            return state;
    }
}

export const articleDropdownListReduser = (state = [], action) => {
    switch (action.type) {
        case "ARTICLEDROPDOWNLIST":
            return [...action.payload];
        default:
            return state;
    }
}

export const articleMenuReduser = (state = "", action) => {

    
    function fromBinary(binary) {
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const charCodes = new Uint8Array(bytes.buffer);
        let result = '';
        for (let i = 0; i < charCodes.length; i++) {
          result += String.fromCharCode(charCodes[i]);
        }
        return result;
      }
      
    switch (action.type) {
        case "GET_ALLARTICLEMENU":

            // const test ='[{"Id":3,"Name":"آموزش  SQL 2016","ParentId":null,"Childs":[{"Id":6,"Name":"توابع در SQL","ParentId":3,"Childs":[]},{"Id":8,"Name":"دستورات پيشرفته SQL ","ParentId":3,"Childs":[{"Id":7,"Name":"دستور Create Table در sql","ParentId":8,"Childs":[]}]},{"Id":9,"Name":"دستورات تعريف داده ها (DDL)","ParentId":3,"Childs":[{"Id":2,"Name":"  دستور CREATE DATABASE در sql","ParentId":9,"Childs":[]}]}]},{"Id":4,"Name":"آموزش SQL2014","ParentId":null,"Childs":[{"Id":1,"Name":"  تابع Avg در sql","ParentId":4,"Childs":[]}]},{"Id":5,"Name":"آموزش SQL 2019","ParentId":null,"Childs":[{"Id":153,"Name":"     نصب Sql 2019","ParentId":5,"Childs":[]},{"Id":302,"Name":"test1-1","ParentId":5,"Childs":[{"Id":303,"Name":"test1-2","ParentId":302,"Childs":[{"Id":304,"Name":"test1-3","ParentId":303,"Childs":[{"Id":305,"Name":"test articcle","ParentId":304,"Childs":[]}]}]}]}]},{"Id":352,"Name":"آموزش تست 1","ParentId":null,"Childs":[{"Id":357,"Name":"تست 1-1","ParentId":352,"Childs":[{"Id":358,"Name":"لورم ايپسوم متن ساختگي ","ParentId":357,"Childs":[]},{"Id":403,"Name":"tttt","ParentId":357,"Childs":[]}]}]},{"Id":353,"Name":"آموزش تست 2","ParentId":null,"Childs":[{"Id":359,"Name":"امفهوم از صنعت چاپ ","ParentId":353,"Childs":[]}]},{"Id":354,"Name":" آموزش تست 3","ParentId":null,"Childs":[{"Id":360,"Name":"تنوع با هدف بهبود","ParentId":354,"Childs":[]}]},{"Id":700,"Name":"test clone trhtrh thrthrth trhgrwj efgwk etdqiw uehgi wechdj jhgsef senhdfukwegdqwdaevuwgef jshegsgeujf jhgseurfgueruwter hweduwygr sehgusyeufr jsegjfrgwseirg segruwy","ParentId":null,"Childs":[]},{"Id":708,"Name":"ooo","ParentId":null,"Childs":[]},{"Id":710,"Name":"yyy","ParentId":null,"Childs":[]},{"Id":711,"Name":"fff","ParentId":null,"Childs":[{"Id":712,"Name":"wfsef","ParentId":711,"Childs":[{"Id":713,"Name":"sdfsdf","ParentId":712,"Childs":[]}]}]}]';
            // const compressed = pako.deflate(test);
            // const restored = pako.inflate(compressed, { to: 'string' });
            // var uint8array = new TextEncoder().encode(test);
            // //console.info('***',uint8array)
            // //console.info("action.payload =",action.payload);
            // var strData = fromBinary(window.atob(action.payload));
            // //var strData =fromBinary(action.payload);
            // //var charData2 = new TextEncoder().encode(strData);
            // console.info("***strData =", fromBinary( strData));
            // var charData = strData.split('').map(function (x) { return x.charCodeAt(0) });
            // var binData =new Uint8Array(charData);
            // console.info('***binData=',binData,pako.inflate(binData),pako.inflate(binData, { to: 'string' }))
            // // Pako inflate
            // var data = pako.inflate(binData, { to: 'string' });
            return JSON.parse(action.payload);
        default:
            return state;
    }
}

