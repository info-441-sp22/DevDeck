import { BASEPOINT } from "../App";

export class ImageService {
    static LOGIN_BASEPOINT = () => BASEPOINT + '/api/users';

    static uploadImage = async (request) => {
        // console.log(request);
        console.log('hit');
        const response = await fetch(
            ImageService.LOGIN_BASEPOINT() + '/imgUpload',
            {
                method: "POST",
                body: request,
                headers: {
                    'Accept': 'multipart/form-data'
                }
            }
        );
    }
    static downloadImages = (request) => {

    }

    static arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };
}