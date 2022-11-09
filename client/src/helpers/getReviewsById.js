export const getReviewById = async(id)=>{

    const url = `https://henryhealthy.shop/tresmiluno/review/producto/${id}`
    console.log(url)
    const review = await (await fetch(url)).json();
    console.log(review)
    return review;
}