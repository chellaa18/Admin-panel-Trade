import { toast } from "react-toastify";

export const fileFilter = ( file ) =>{
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    // console.log(file[0].type);
    const extname = filetypes.test(
     (file[0]?.name)?.toLowerCase()
    );
    // console.log(extname);
    const mimetype = filetypes.test(file[0]?.type);
    // console.log(mimetype);
    if (mimetype && extname) {
     return true
    }else(
        toast.warning("Invalid File Format")
    )
}
