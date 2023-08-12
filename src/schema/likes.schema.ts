import { object, string } from "yup";

const storeLikesSchema = object({
    body: object({
        user_id: string().required("user_id is required"),
        content_id: string().required("content_id is required")
    }),
});

const totalLikesSchema = object({
    body: object({
        content_id: string().required("content_id is required")
    }),
})

export { storeLikesSchema, totalLikesSchema }