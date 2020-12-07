import _ from "lodash";

export function paginate(items, pageNumber, pageSize){
    const pageIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(pageIndex).take(pageSize).value();
}