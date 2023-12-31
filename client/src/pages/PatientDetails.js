import React, { useState } from "react";
import { createRoot } from "react-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Web3Storage } from "web3.storage";
import Navbar from "../components/Navbar";
import {useSelector} from 'react-redux'
import { Steps } from "antd";
//import css file
import "../styles/PatientDetails.css";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Divider,
  Upload,
} from "antd";
// import { UploadOutlined  } from "icons"





const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PatientDetails = () => {
  const[ipfsUrl, setIpfsUrl]=useState('')
  // const profileData = JSON.parse(localStorage.getItem('user._id'))
  // var jsonString = localStorage.getItem('user');

  // console.log(jsonString)
  // var jsonObject = JSON.parse(jsonString);
  const user  = useSelector((state)=>state.user)
  // console.log(user)

  // var name = jsonObject.name;
  // var email = jsonObject.email;
  // const user=useSelector(state=>state.user)
  const [detailsForm, setDetailsForm] = useState({
    
    dob: "",
    gender: "",
    maritalstatus: "",
    address: "",
    state: "",
    phone: "",
    zip: "",
    pcp: "",
    insurancename: "",
    validity: "",
    insurancetype: "",
    relation: "",
    ipfsUrl,
    scanneddocu: "", //hash of the file
    //IMAGE AND DOC URL TO BE ADDED
  });
  //function to submit details
  const SubmitDetails = async (e) => {
    
    // const name = profileData.name;
    // const email = profileData.email;
    // const userId = profileData._id;
    const {
      dob,
      gender,
      maritalstatus,
      address,
      state,
      phone,
      emergencyContact,
      zip,
      pcp,
      insurancename,
      validity,
      insurancetype,
      relation,
      // ipfsUrl,
      scanneddocu,
    } = detailsForm;
    e.preventDefault();
    try {
      // WORKS
      let result = await fetch('http://localhost:4000/details', {
        method: "POST",
        body: JSON.stringify({dob,gender,address,state,zip,phone,emergencyContact,scanneddocu }),
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
      })
      result = await result.json();
      
      if (result) {
        message.success("Submitted successfully")
        window.location('/')
      } else {
        message.error("Something went wrong");
      }
    } catch (e) {
      console.log(e.message);
      
    }
  };

  const handleInput = (e) => {
    
    setDetailsForm({ ...detailsForm, [e.target.name]: e.target.value });
   
  };


  // IPFS
  const apiToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzQjE2NEJjMzM3MTFBMmQyQTEyYzIwYkE2MjA3YjIzQWExQTY0NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzg4OTM2MDg0MzEsIm5hbWUiOiJpcGZzX2RvY3MifQ.wXK5hTOg_J3rgNGKf5Rw0D6keTv7KjfJq1ZbsTpTxyQ";

  const url = "";
  const client = new Web3Storage({ token: apiToken });
  let file;

  const handleUpload = async () => {
    console.log(document.getElementById("input").files[0]);
    var fileInput = document.getElementById("input");
    const rootCid = await client.put(fileInput.files, {
      name: "user documents",
      maxRetries: 3,
    });
    const rootUrl="https://"+rootCid+".ipfs.dweb.link"
    console.log(rootUrl);
    // detailsForm.photo=setIpfsUrl(rootUrl)
    message.success("Uploaded successfully");

    // const res = await client.get(rootCid);
    // const files = await res.files();
    // url = URL.createObjectURL(files[0]);
    file = rootCid;
    // console.log(typeof file, file);
  };

  //IPFS ends


  return (
    <body>
      <Navbar />
      <div className="details-form">
        <div className="title">
          <h2>Patient details</h2>
        </div>
        <Form
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 35,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
        >
          {/* <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
        <Checkbox>Checkbox</Checkbox>
      </Form.Item> */}

          <Form.Item label="Name" className="first" required="true">
            <Input name="name" onChange={handleInput} value={user.name} readOnly/>
          </Form.Item>

          <Form.Item label="Email" className="first" required="true">
            <Input type="email" value={user.email} onChange={handleInput} readOnly/>
          </Form.Item>

          <Form.Item label="Date of Birth" required="true">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Gender">
            <Radio.Group>
              <Radio value="Male" name="gender" onChange={handleInput}>
                {" "}
                Male{" "}
              </Radio>
              <Radio value="Female" name="gender" onChange={handleInput}>
                {" "}
                Female{" "}
              </Radio>
              <Radio value="Other" name="gender" onChange={handleInput}>
                Other
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Address" className="first" required="true">
            <Input name="address" onChange={handleInput} />
          </Form.Item>

          <Form.Item label="State" className="first" required="true">
            <Input name="state" onChange={handleInput} />
          </Form.Item>

          <Form.Item label="Zip" className="first" required="true">
            <Input type="number" name="zip" onChange={handleInput} />
          </Form.Item>

          
          <Form.Item
            label="Emergency Contact"
            className="first"
            required="true"
          >
            <Input type="tel" name="emergencyContact" onChange={handleInput} />
          </Form.Item>
          {/* 
      <Form.Item label="Do you have a PCP- Primary Care Physician">
        <Radio.Group>
          <Radio value='Yes'>Y</Radio>
          <Radio value='No'>N</Radio>
        </Radio.Group>
      </Form.Item> */}

          {/* <Form.Item label="Did you PCP refer to urgent care?" >
        <Radio.Group>
          <Radio value='Yes' name="didpcp">Y</Radio>
          <Radio value='No' name="didpcp">N</Radio>
        </Radio.Group>
      </Form.Item> */}

          {/* <div className="title" >
        <h2>Insurance Details</h2>
      </div> 
      <Form.Item label="Insurance Type" >
        <Select>
          <Select.Option value="Health Insurance" name="insurancetype" onChange={handleInput}></Select.Option>
          <Select.Option value="Life Insurance" name="insurancetype" onChange={handleInput}></Select.Option>

        </Select>
      </Form.Item> */}
          {/* <Form.Item label="Subscriber DOB">
        <DatePicker />
      </Form.Item> */}

          {/* <Form.Item label="Insurance Name" className='first' required="true">
        <Input  name="insurancename"/>
      </Form.Item>
      
     <Form.Item label="Insurance Validity" >
      <DatePicker name="validity" onChange={handleInput}/>
     </Form.Item>

       <Form.Item label="Relation to Patient">
        <Radio.Group>
          <Radio value='Self'  name="relation" onChange={handleInput}>Self</Radio>
          <Radio value='Child'  name="relation" onChange={handleInput}>Child</Radio>
          <Radio value='Spouse'  name="relation" onChange={handleInput}>Spouse</Radio>
        </Radio.Group>
      </Form.Item> */}

          <h2 className="title">Records</h2>
          {/* Working but need to make it beautiful https://ant.design/components/upload */}
          <Form.Item>
            <section>
              <div>
                <label for="file">Upload Your Photo</label>
                <input type="file" id="input" multiple />
              </div>
              <Button onClick={handleUpload} 
             >
                Upload document
              </Button>
            </section>
          </Form.Item>
          <Form.Item label="IPFS URL">
            <Input value= {ipfsUrl} readOnly onChange={handleInput} />
          </Form.Item>

          <Form.Item>
            <section>
              <div>
                <label for="file">Upload Medical Document(if any)</label>
                <input type="file" id="input" name="medicaldoc" multiple />
              </div>
              <Button>Upload document</Button>
            </section>
          </Form.Item>
          {/* <section className="patient__records">
            {DisplayDecord}
            <Button type="dashed" onClick={addRecords}>
              Add Record
            </Button>
          </section> */}

          <br></br>
          <Form.Item>
            <Button className="btn" onClick={SubmitDetails}>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </body>
  );
};
export default PatientDetails;
