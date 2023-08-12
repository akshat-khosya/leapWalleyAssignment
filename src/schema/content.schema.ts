import { object, string } from "yup";

const createContentSchema = object({
    body: object({
        user_id: string().required("user_id is required"),
    }),
});

export { createContentSchema }