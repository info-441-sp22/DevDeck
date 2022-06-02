import { BASEPOINT } from "../App";
import { fetchJSON } from "../utils/utils";

export class PostService {
    static POST_BASEPOINT = () => BASEPOINT + '/api/posts';

    static findPosts = async (request) => {
        return await fetchJSON(this.POST_BASEPOINT() + '?username=' + encodeURIComponent(request.username));
    }

    static findAllPosts = async () => {
        return await fetchJSON(this.POST_BASEPOINT());
    }

    static findSinglePost = async (request) => {
        return await fetchJSON(this.POST_BASEPOINT() + '?id=' + encodeURIComponent(request.id));
    }
}