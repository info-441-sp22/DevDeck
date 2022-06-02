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
            ImageService.IMAGE_BASEPOINT() + '/post',
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

    static getMetadataAndUploadPostImage = async (request, image) => {
        // Get the image metadata
        const metadataResponse = await fetch(
            ImageService.IMAGE_BASEPOINT() + '/post/metadata',
            {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responseMetadata = await metadataResponse.json();

        // Upload the image
        await this.uploadPostImage(image);
    }

    static uploadPostImage = async (file) => {
        const response = await fetch(
            ImageService.IMAGE_BASEPOINT() + '/post',
            {
                method: "POST",
                credentials: 'include',
                body: file,
                headers: {
                    'Accept': 'multipart/form-data'
                }
            }
        );
    }

    static getPostImage = async (request) => {
        const query = '?post_id=' + encodeURIComponent(request.post_id);
        const response = await fetch( 
            ImageService.IMAGE_BASEPOINT() + '/post' + query,
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

    static getPostImages = async (data) => {
        data.forEach(async (post) => post.image_url = await ImageService.getPostImage({ post_id: post.id }));

        return data;
    }
}