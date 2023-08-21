const handleAsyncError = async (asyncFuc) => {
    try {
        const data = await asyncFuc();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export default handleAsyncError;