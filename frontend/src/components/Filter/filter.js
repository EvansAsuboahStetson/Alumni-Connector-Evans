import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./filter.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getFilter } from "../../functions/users";
import { useHistory } from "react-router-dom";


function Filter() {
    const colourOptions = [
        { value: "Artificial Intelligence", label: "Artificial Intelligence" },
        { value: "Product Management", label: "Product Management" },
        { value: "Mental Health", label: "Mental Health" },
        { value: "Physics", label: "Physics" },
        { value: "Statistics", label: "Statistics" },
        { value: "Technology", label: "Technology" },
        { value: "Finance", label: "Finance" },

        
    ];
    const [selectedValue, setSelectedValue] = useState([]);
 
    const [minor,setMinor]= useState(null)
    const [major,setMajor] = useState(null)

    const [item, setItem] = useState({ kindOfStand: "", another: "another" });

    const { kindOfStand } = item;
  
    const handleChanges = e => {
      e.persist();
      console.log(e.target.value);
  
      setItem(prevState => ({
        ...prevState,
        kindOfStand: e.target.value
      }));
    };
    
    let history = useHistory();
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
 

    const submit =async()=>{
        console.log(major)
        console.log(minor)
        console.log(selectedValue)
        const token = localStorage.getItem("token");
        console.log("sub-item",item)

        try {
            const datum = {
              major: major,
              minor:minor,
              interests: selectedValue,
              role:item
            };
         
            const {data} = await getFilter(token,datum);
            console.log(data)

            history.push({
                pathname: "/user/filter",
                state: data
              });
          
    
          
          } catch (err) {
            console.log(err)
       
          };
    }
    useEffect(()=>{
        if (major=='')
        {
            setMajor(null)
        }
        if (minor=='')
        {
            setMinor(null)
        }

    },[major,minor])

    return (
        <div className="Filtcontainer">
            <Form className="p-3 mb-2 bg-white text-black">
                <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Major</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setMajor(e.target.value)}>
                    <option value="">Select Major</option>
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
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMinor" >
                    <Form.Label>Minor</Form.Label>
                    <Form.Select aria-label="Default select example"  onChange={(e) => setMinor(e.target.value)}>
                    <option value="">Select Minor</option>
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
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Interest</Form.Label>
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
          value="student"
          type="radio"
          aria-label="radio 1"
          label="Student"
          onChange={handleChanges}
          checked={kindOfStand === "student"}
        />
        <Form.Check
          value="alumni"
          type="radio"
          aria-label="radio 2"
          label="Alumni"
          onChange={handleChanges}
          checked={kindOfStand === "alumni"}
        />
                </Form.Group>
                <Button variant="primary"  onClick={submit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Filter;
