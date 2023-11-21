import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NamikBoard = () => {
  const [boardData, setBoardData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");


  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchData();
  }, []);

  const ColumnDefs = [
    { headerName: "No", field: "bno", width: 100 },
    { headerName: "Title", field: "title", width: 300 },
    { headerName: "Writer", field: "writer" },
    { headerName: "Content", field: "content" },
    { headerName: "Write Date", field: "writeDate" },
    { headerName: "Update Date", field: "updateDate" },
    { headerName: "Like", field: "boardLike" },
    { headerName: "Deleted Yn", field: "deletedYn", hide: true },
  ];


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:80/board/board");
      console.log("response", response);
      setBoardData(response.data.boardList); // 데이터를 상태로 업데이트
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onCellClicked = (params) => {
    console.log("params", params);
    pa
    setShow(true)
  };

  return (
    <>
      <h1>남익의 게시판😺</h1>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={ColumnDefs}
          rowData={boardData}
          defaultColDef={{
            //칼럼의 기본 설정을 정의, 칼럼 크기 조절과 편집 가능 여부를 설정하고 있다.
            resizable: true,
            // editable: true
          }}
          style={{
            height: "400%",
            width: "100%",
          }}
          onCellClicked={onCellClicked}
        />
      </div>


      <>
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>My Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto" }}>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group controlId="formBasicContent">
              <Form.Label>Content:</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter content" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      
    </>
  );
};

export default NamikBoard;
