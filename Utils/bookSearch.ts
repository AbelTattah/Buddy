import axios from "axios";

// Book search function
const bookSearch = async(keywords:string) => {
    const test = /pdf/;

    const response = await axios.post(
        'https://com.buddyyy.duckdns.org/geturl',
        {
            keywords: keywords,
        },
    );
    
    return response.data["links"].map((item:string,index:number)=>{
        if (test.test(item)) {
            return {
                url:item,
                image:response.data["images"][index],
                title:response.data["titles"][index]
            }
        }
    })
}

export {bookSearch}