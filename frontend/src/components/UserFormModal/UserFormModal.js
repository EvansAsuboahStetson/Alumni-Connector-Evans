import { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

// Show modal to create or edit user
export default function UserFormModal(props) {
  const [validated, setValidated] = useState();
  const { show, onHide, title, user, onSubmit } = props;
  const [selectedValue, setSelectedValue] = useState([]);

  const nameRef = useRef(user?.name);
  const emailRef = useRef(user?.email);
  const roleRef = useRef(user?.role);
  const majorRef = useRef(user?.major);
  const minorRef = useRef(user?.minor);
  const profilePicRef = useRef(user?.profilePic);
  const headlineRef = useRef(user?.headline);
  
  useEffect(() => {
    if (show) {
      setValidated(false);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    e.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
      major: majorRef.current.value,
      minor: minorRef.current.value,
      interests: selectedValue,
      profilePic: profilePicRef.current.value,
      headline: headlineRef.current.value
    };

    onSubmit(user);
  };

  //Major dropdown
  const majorText = user?.major;
  const minorText = user?.minor;
  const [type, setType] = useState(majorText);
  const [mtype, setmType] = useState(minorText);

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'red' : 'black',
        padding: 5,
      })
  }
  const colourOptions = [
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Product Management", label: "Product Management" },
    { value: "Mental Health", label: "Mental Health" },
    { value: "Physics", label: "Physics" },
    { value: "Statistics", label: "Statistics" },
    { value: "Technology", label: "Technology" },
    { value: "Finance", label: "Finance" },

];




const inputRef = useRef(null);

const handleClick = () => {
  // 👇️ open file input box on click of other element
  inputRef.current.click();
};

const handleFileChange = event => {
  const fileObj = event.target.files && event.target.files[0];
  if (!fileObj) {
    return;
  }

  console.log('fileObj is', fileObj);


   // setting up the reader
   var reader = new FileReader();
   reader.readAsText(fileObj,'UTF-8');

   // here we tell the reader what to do when it's done reading...
   reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      console.log( content );
   }
  
};


  return (
    <Modal show={show} onHide={onHide}>
      
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTextName">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              ref={nameRef}
              defaultValue={user?.name}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email address"
              ref={emailRef}
              defaultValue={user?.email}
              disabled
            />
          </Form.Group>
          <div>
 


    </div>

          <Form.Group controlId="formBasicTextEmail">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role"
              ref={roleRef}
              defaultValue={user?.role}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextMajor">
              <Form.Label>Select Major</Form.Label>
              <Form.Control
                as="select"
                ref={majorRef}
                value={type}
                defaultValue={user?.major}
                onChange={e => {
                  console.log("e.target.value", e.target.value);
                  setType(e.target.value);
                }}
              >
                <option value="Accounting">Accounting</option>
                <option value="American Studies">American Studies</option>
                <option value="Applied Mathematics">Applied Mathematics</option>
                <option value="Aquatic and Marine Biology">Aquatic and Marine Biology</option>
                <option value="Art">Art</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Biology">Biology</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Business Systems Analysis">Business Systems Analysis</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Communication and Media Studies">Communication and Media Studies</option>
                <option value="Computer Information Systems">Computer Information Systems</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Digital Arts">Digital Arts</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicTextMinor">
              <Form.Label>Select Minor</Form.Label>
              <Form.Control
                as="select"
                ref={minorRef}
                value={mtype}
                defaultValue={user?.minor}
                onChange={e => {
                  console.log("e.target.value", e.target.value);
                  setmType(e.target.value);
                }}
              >
                <option value="None">None</option>
                <option value="Accounting">Accounting</option>
                <option value="American Studies">American Studies</option>
                <option value="Applied Mathematics">Applied Mathematics</option>
                <option value="Aquatic and Marine Biology">Aquatic and Marine Biology</option>
                <option value="Art">Art</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Biology">Biology</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Business Systems Analysis">Business Systems Analysis</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Communication and Media Studies">Communication and Media Studies</option>
                <option value="Computer Information Systems">Computer Information Systems</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Digital Arts">Digital Arts</option>
              </Form.Control>
            </Form.Group>

        


          <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Interests</Form.Label>
                    <Select
                        isMulti
                        name="colors"
                        options={colourOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={customStyles}
                        value={colourOptions.filter(obj => selectedValue.includes(obj.value))} // set selected values
                        onChange={handleChange}
                        
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextProfilepic">
            <Form.Label>Profile Pic</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image link"
              ref={profilePicRef}
              defaultValue={user?.profilePic}
            />
          <Form.Label>Upload Profile Pic</Form.Label>
            <Form.Control
             ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            defaultValue=""/>
             
          </Form.Group>
          <Form.Group controlId="formBasicTextName">
            <Form.Label>Headline</Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit headline"
              ref={headlineRef}
              defaultValue={user?.headline}
              required
            />
          </Form.Group>
       
          <Button className="m-2" variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button className="m-2" type="submit" variant="success">
            Submit
          </Button>
          
        </Form>
        
      </Modal.Body>
    </Modal>
  );
}