import React from "react";
const PaginationPrueba=({postsPerPage, totalPosts, paginate})=>{
    const pageNumbers=[];
    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number=>(
                    <li key={number} className="page-item" style={{"color":"white"}}>
                        <a onClick={()=>paginate(number)} href="!#" className="page-link" style={{"fontSize":"20px"}}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default PaginationPrueba;