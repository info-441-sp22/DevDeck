import { BASEPOINT } from "../App";

export class ImageService {
    static IMAGE_BASEPOINT = () => BASEPOINT + '/api/images';

    static uploadProfileImage = async (request) => {
        // console.log(request);
        const response = await fetch(
            ImageService.IMAGE_BASEPOINT() + '/profile',
            {
                method: "POST",
                credentials: 'include',
                body: request,
                headers: {
                    'Accept': 'multipart/form-data'
                }
            }
        );
    }

    static getProfileImage = async (request) => {
        const response = await fetch(
            ImageService.IMAGE_BASEPOINT() + '/profile?username=' + encodeURIComponent(request.username),
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responseBlob = await response.blob(); 

        return URL.createObjectURL(responseBlob);
    }

    static arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };
}