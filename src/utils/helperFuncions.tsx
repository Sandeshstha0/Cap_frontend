import axios from "axios";
import { headers } from "next/headers";

export const syncLocalStorageToCookie = () => {

    const accessToken = localStorage.getItem("accessToken");
    // console.log("accessToken: ", accessToken);
    if (accessToken) {
        document.cookie = `token=${accessToken}; path=/`;
    } else {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }

}



// export const isAccessTokenValid = async () => {

//     try {
//         const { data } = await axios.get(`https://ams-api-dev.edxplor.com/api/module`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
//         // console.log("data: ", data);
//         // console.log("data.message: ", data?.message);
//         if (!data?.message?.includes("Unauthorized")) {
//             document.cookie = `isAccessTokenValid=true; path=/`;
//         } else {
//             document.cookie = `isAccessTokenValid=false; path=/`;
//         }
//     } catch (error) {
//         // console.log("error while checking isAccessTokenValid");
//         document.cookie = `isAccessTokenValid=false; path=/`;
//     }

// }