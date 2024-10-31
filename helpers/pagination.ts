interface ObjectPagination {
    limitItem: number,
    currentPage: number,
    skip?: number,
}

const paginationHelper = (objectPagination : ObjectPagination, query: Record<string, any> , countPage: number): ObjectPagination => {
    
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    if(query.limit){
        objectPagination.limitItem = parseInt(query.limit);
    }
    objectPagination.skip = ((objectPagination.currentPage - 1) * objectPagination.limitItem);

    return objectPagination;
}

export default paginationHelper;