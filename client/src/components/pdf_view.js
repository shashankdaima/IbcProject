import React, { useEffect, useRef, useState } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import {  Row, Col } from "react-bootstrap";

export default function MyPdfViewer(props) {
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
    const [uri,setUri] =useState();
    const { pdfDocument, pdfPage } = usePdf({
        file: 'https://ipfs.infura.io/ipfs/'+'QmUeMHRheEi52jujnBCE1yqESWvcdpPNVhc2DmM7RPb8Mu',
        page,
        canvasRef,
    });


    return (
        <div >
            {!pdfDocument && <span>Loading...</span>}
            <canvas ref={canvasRef} />
            {Boolean(pdfDocument && pdfDocument.numPages) && (
                <nav>
                    <Row  className="pager mb-3">
                        
                            <Col className="previous">
                                <button disabled={page === 1}
                                    className="btn btn-secondary"
                                    onClick={() => setPage(page - 1)}>
                                    Previous
                                </button>
                            </Col>
                            <Col className="next">
                                <button
                                    className="btn btn-secondary"
                                    disabled={page === pdfDocument.numPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            </Col>
                    </Row>
                </nav>
            )}
        </div>
    );
};