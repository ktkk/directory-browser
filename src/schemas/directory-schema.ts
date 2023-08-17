import {
    type Input,
    type Output,
    type BaseSchema,
    array,
    object,
    number,
    string,
    optional,
    merge,
    recursive,
} from "valibot";
import { Prettify } from "../types/utils";
import { type Directory as DirectoryInput } from "../types/directory";

const BaseDirectorySchema = object({
    id: number(),
    parentId: optional(number()),
    title: string(),
});

type Directory = Output<typeof BaseDirectorySchema> & {
    children?: Directory[];
};

export const DirectorySchema: BaseSchema<Directory> = merge([
    BaseDirectorySchema,
    object({
        subcategories: recursive(() => optional(array(DirectorySchema))),
    }),
]);

/* eslint-disable @typescript-eslint/no-unused-vars */
type _1 = Prettify<Input<typeof DirectorySchema>>;
//   ^?
type _2 = Prettify<DirectoryInput>;
//   ^?
/* eslint-enable @typescript-eslint/no-unused-vars */