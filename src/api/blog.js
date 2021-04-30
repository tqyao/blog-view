import axios from "@/plugins/axios";

export function addBlog(blog) {
    return axios({
        url: '/articles/article',
        method: 'post',
        data: {
            ...blog
        }
    })
}