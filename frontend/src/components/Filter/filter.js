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
        
    ];
    const [selectedValue, setSelectedValue] = useState([]);
 
    const [minor,setMinor]= useState(null)
    const [major,setMajor] = useState(null)
    
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

        try {
            const datum = {
              major: major,
              minor:minor,
              interests: selectedValue
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
            <Form className="p-3 mb-2 bg-dark text-white">
                <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Major</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setMajor(e.target.value)}>
                        <option value="">Select Major</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Data Analytics">Data Analytics</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMinor" >
                    <Form.Label>Minor</Form.Label>
                    <Form.Select aria-label="Default select example"  onChange={(e) => setMinor(e.target.value)}>
                        <option value="">Select Minor</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Data Analytics">Data Analytics</option>
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
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary"  onClick={submit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Filter;
