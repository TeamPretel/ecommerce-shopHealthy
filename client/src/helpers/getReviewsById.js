export const getReviewById = async(id)=>{

    const url = `https://healthyback.onrender.com/tresmiluno/review/producto/${id}`
    console.log(url)
    const review = await (await fetch(url)).json();
    return review;
}