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

    static uploadProjectImage = async (request) => {
        // console.log(request);
        const response = await fetch(
            ImageService.IMAGE_BASEPOINT() + '/project',
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

    static getProjectImage = async (request) => {
        const response = await fetch(
            ImageService.IMAGE_BASEPOINT() + '/project?username=' + encodeURIComponent(request.username),
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
}