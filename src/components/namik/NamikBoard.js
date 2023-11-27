import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NamikBoard = () => {
  const [boardData, setBoardData] = useState([]);
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");

  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");

  const [writer, setWriter] = useState("");
  const [writer2, setWriter2] = useState("");

  const [bno, setBno] = useState("");
  const [NewInsert, setNewInsert] = useState("");
  const [updateDate2, setUpdateDate2] = useState("");
  const [maxBno, setMaxBno] = useState("");

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
      setBoardData(response.data.boardList);
      const maxBno = response.data.boardList.reduce((max, item) => {
        return item.bno > max ? item.bno : max;
      }, 0);
      setMaxBno(maxBno);
      console.log("maxBno",maxBno)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onGridReady = (params) => {
    console.log("onGridReadyparams", params);
  };

  const onCellClicked = (params) => {
    setNewInsert(false);
    console.log("params", params);
    setContent(params.data.content);
    setTitle(params.data.title);
    setBno(params.data.bno);
    setWriter(params.data.writer);
    setShow(true);
  };

  const updateBoard = async () => {
    setShow(false);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const isoDate = `${year}-${month}-${day}`;

    const updatedData = {
      bno: bno,
      boardLike: 10, // 수정할 내용
      content: content,
      deletedYn: "N",
      title: title,
      updateDate: isoDate,
      writeDate: isoDate,
      writer: writer,
    };

    console.log("updatedData", updatedData);

    try {
      const response = await axios.put(
        "http://localhost:80/board/board",
        updatedData
      );
      console.log("response", response);

      // 서버에서 반환한 데이터를 적절히 처리하거나 상태로 업데이트할 수 있습니다.
      // 예: setBoardData(response.data.boardList);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    window.location.reload();
  };



  const open = () => {
    setNewInsert(true);
    handleShow();
    setTitle("");
    setContent("");
  };



  const InsertBoard = async () => {
    console.log("maxBnomaxBnomaxBno",maxBno);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const isoDate = `${year}-${month}-${day}`;
    const isoDate2 = `${year}-${month}-${day}`;

    const insertData = {
      boardLike: 10, // 수정할 내용
      content: content2,
      deletedYn: "N",
      title: title2,
      updateDate: isoDate2,
      writeDate: isoDate,
      writer: `writer${maxBno+1}`,
    };

    try {
      const response = await axios.post(
        "http://localhost:80/board/board",
        insertData
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    handleClose();
    alert("등록되었습니다.");
    window.location.reload();
  };


  const deleteBoard = async () => {
    console.log("🤗🤗🤗");
    console.log("writer/bno",writer,bno);
    setShow(false);

    try {
      const response = await axios.put(
        `http://localhost:80/board/board/conceal/${writer}/${bno}`,
      );
      console.log("response", response);

    } catch (error) {
      console.error("Error updating data:", error);
    }
    window.location.reload();
  };


  return (
    <>
      <h1>남익의 게시판😺</h1>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={ColumnDefs}
          rowData={boardData}
          defaultColDef={{
            resizable: true,
            // editable: true
          }}
          onGridReady={onGridReady}
          onCellClicked={onCellClicked}
        />
      </div>

      <>
        <Button variant="warning" onClick={open}>
          글등록✏️
        </Button>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{NewInsert ? "글 등록" : "글 수정"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflowY: "auto" }}>
            <Form>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={NewInsert ? title2 : title}
                  onChange={(e) => {
                    if (NewInsert) {
                      setTitle2(e.target.value);
                    } else {
                      setTitle(e.target.value);
                    }
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicContent">
                <Form.Label>Content:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter content"
                  value={NewInsert ? content2 : content}
                  onChange={(e) => {
                    if (NewInsert) {
                      setContent2(e.target.value);
                    } else {
                      setContent(e.target.value);
                    }
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="warning"
              onClick={NewInsert ? InsertBoard : updateBoard}
            >
              {NewInsert ? "등록" : "수정"}
            </Button>
            <Button
              variant="warning"
              onClick={deleteBoard}
              style={{ display: NewInsert ? "none" : "block" }}
            >
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default NamikBoard;
