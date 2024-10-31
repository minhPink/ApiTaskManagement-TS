import { Request , Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";


export const index = async (req: Request, res: Response) => {
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    const find: Find = {
        deleted: false,
    };

    if(req.query.status) {
        find.status = req.query.status.toString();
    }

    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey.toLocaleString();
        sort[sortKey] = req.query.sortValue;
    }

    let imitPaginatiton = {
        limitItem: 2,
        currentPage: 1
    }

    const countTasks = await Task.countDocuments(find);
    const objectPagination = paginationHelper(
        imitPaginatiton,
        req.query,
        countTasks
    );

    const search = searchHelper(req.query);

    if (search.regex) {
        find.title = search.regex;
    }

    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.skip);


    res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const task = await Task.findOne({
        _id:id,
        deleted: false
    });


    res.json(task);
}

// [PATCH] /tasks/change-status/:id
export const changeStatus= async (req : Request, res: Response) => {
    try {
        const id: string = req.params.id;

        const status: string = req.body.status;

        await Task.updateOne({
            _id: id,
        },{
            status: status
        });

        res.json({
            code: 200,
            message:"Cập nhật trạng thái thành công !" 
        });
    } catch (error) {
        res.json({
            code: 400,
            message:"Cập nhật trạng thái không thành công !"
        });
    }
};

// [PATCH] /tasks/change-multi
export const changeMulti= async (req: Request, res: Response) => {
    try {

        const ids: string = req.body.id;
        const key: string = req.body.key;
        const value: string = req.body.value;

        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in : ids }
                },{
                    status: value
                });

                res.json({
                    code: 200,
                    message:"Cập nhật trạng thái thành công !" 
                });
                break;
        
            default:
                res.json({
                    code: 400,
                    message:"Cập nhật trạng thái không thành công !"
                });
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message:"Cập nhật trạng thái không thành công !"
        });
    }
};

// [POST] /tasks/create
export const createPost = async (req: Request, res: Response) => {
    try {
        const taskCreate = new Task(req.body);
        const data = await taskCreate.save();

        res.json({
            code: 200,
            message: "Tạo thành công",
            data: data
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Tạo không thành công !",
        })
    }
};

// [PATCH] /tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        await Task.updateOne({_id: id},req.body);

        res.json({
            code: 200,
            message: "Cập nhật thành công !",
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật không thành công !",
        })
    }
};

// [DELETE] /tasks/delete/:id
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await Task.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date(),
        })

        res.json({
            code: 200,
            message: "Xóa thành công !",
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Xóa không thành công !",
        })
    }
};

// [DELETE] /tasks/delete-multi
export const deleteMulti = async (req: Request, res: Response) => {
    try {

        const ids: string = req.body.id;
        const key: string = req.body.key;

        switch (key) {
            case "delete":
                await Task.updateMany({
                    _id: { $in : ids }
                },{
                    deleted: true,
                    deletedAt: new Date()
                });

                res.json({
                    code: 200,
                    message:"Xoá thành công !" 
                });
                break;
        
            default:
                res.json({
                    code: 400,
                    message:"Xóa không thành công !"
                });
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message:"Xóa không thành công !"
        });
    }
};