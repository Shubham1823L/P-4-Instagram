import logger from "../../../server/services/logger";
import { api } from "./axios";

export const apiToggleLike = async (postId) => {
    try {
        const response = await api.post(`/postInteractions/${postId}/like`)
        return response
    } catch (error) {
        logger(error,"Error toggling like")
        return error.response
    }
}
