const editions = {1: "volume_one.pdf"}
function viewPDF(edition){
    if(edition in editions)
        window.open("zines/" + editions[edition], "_blank");
    else
        alert("Invalid Zine Index")
}