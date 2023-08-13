import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";

export default function CommentSection({ comment, comments, putComment,setcomment}) {
    const onchange = (e) => {
        setcomment(e.target.value);
      }
    return (
        <MDBContainer className="mt-5" style={{ height: "auto", width: "80vw" }}>
            <MDBRow className="justify-content-center">
                <MDBCol className="card-main">
                    <MDBCard
                        className="shadow-0 border"
                        style={{ backgroundColor: "#f0f2f5" }}
                    >
                        <MDBCardBody>
                            <div className="comSend">
                                <MDBInput className="comInput" wrapperClass="mb-4" onChange={onchange} value={comment}  placeholder="Type comment..."/>
                                <button onClick={putComment} >Send</button>
                            </div>
                            <MDBCard className="mb-4">
                                {comments && comments.map((comment,index) => {
                                    return (
                                        <MDBCardBody key={index}>
                                            <p style={{ color: "#cf6f83" }}>{comment.comment}</p>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex flex-row align-items-center">
                                                    <MDBCardImage
                                                        src={`data:image/svg+xml;base64,${comment.avatar}`}
                                                        alt="avatar"
                                                        width="25"
                                                        height="25"
                                                    />
                                                    <p className="small mb-0 ms-2" style={{ color: "white" }}>{comment.name}</p>
                                                </div>
                                            </div>
                                        </MDBCardBody>
                                    )
                                })}
                            </MDBCard>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}