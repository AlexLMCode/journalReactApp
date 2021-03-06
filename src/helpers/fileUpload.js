export const fileUpload = async (file) => {


    const cloudUrl = "https://api.cloudinary.com/v1_1/do4cczndo/upload";

    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('upload_preset', "react-journal");

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }

    //return url img
}