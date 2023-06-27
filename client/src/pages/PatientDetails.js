import React,{useState} from 'react'
import { createRoot } from 'react-dom'
import { PlusOutlined } from '@ant-design/icons'
import { Web3Storage } from "web3.storage";
//import css file
import '../styles/PatientDetails.css'
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
  } from 'antd';
  // import { UploadOutlined  } from "icons"

  const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PatientDetails=()=>{
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
        }
        );
        console.log(rootCid);
        message.success('Uploaded successfully')
        // const res = await client.get(rootCid);
        // const files = await res.files();
        // url = URL.createObjectURL(files[0]);
        file = rootCid;
        // console.log(typeof file, file);
        };


        //IPFS ends


    return(
      <body>     
      <div className="title">
        <h2>Patient details</h2>
      </div>   
      <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
    >
      {/* <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
        <Checkbox>Checkbox</Checkbox>
      </Form.Item> */}
      
      <Form.Item label="Name" className='first' required="true">
        <Input />
      </Form.Item>

      <Form.Item label="Email" className='first' required="true" >
        <Input type='email'/>
      </Form.Item>

      <Form.Item label="Date of Birth" required='true'>
        <DatePicker />
      </Form.Item>

      <Form.Item label="Gender">
        <Radio.Group>
          <Radio value="Male"> Male </Radio>
          <Radio value="Female"> Female </Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Marital Status" >
        <Radio.Group>
          <Radio value="S">S</Radio>
          <Radio value="M">M</Radio>
          <Radio value="D">D</Radio>
          <Radio value="W">W</Radio>
        </Radio.Group>
      </Form.Item>
      
      <Form.Item label="Address" className='first' required="true">
        <Input />
      </Form.Item>

      <Form.Item label="City" className='first' required="true">
        <Input />
      </Form.Item>

      <Form.Item label="State" className='first' required="true">
        <Input />
      </Form.Item>

      <Form.Item label="Zip" className='first' required="true">
        <Input type='number'/>
      </Form.Item>

      <Form.Item label="Phone" className='first' required="true">
        <Input type='number'/>
      </Form.Item>

      <Form.Item label="Emergency Contact" className='first' required="true">
        <Input type='number'/>
      </Form.Item>

      <Form.Item label="Do you have a PCP- Primary Care Physician">
        <Radio.Group>
          <Radio value='Yes'>Y</Radio>
          <Radio value='No'>N</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Did you PCP refer to urgent care?">
        <Radio.Group>
          <Radio value='Yes'>Y</Radio>
          <Radio value='No'>N</Radio>
        </Radio.Group>
      </Form.Item>

      <div className="title">
        <h2>Insurance Details</h2>
      </div> 
      <Form.Item label="Insurance Type">
        <Select>
          <Select.Option value="Health Insurance"></Select.Option>
          <Select.Option value="Life Insurance"></Select.Option>

        </Select>
      </Form.Item>
      
      <Form.Item label="Subscriber Name" className='first' required="true">
        <Input />
      </Form.Item>

      <Form.Item label="Subscriber DOB">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Insurance Name" className='first' required="true">
        <Input />
      </Form.Item>
      
     <Form.Item label="Insurance Validity">
      <RangePicker/>
     </Form.Item>

       <Form.Item label="Relation to Patient">
        <Radio.Group>
          <Radio value='Self'>Self</Radio>
          <Radio value='Child'>Child</Radio>
          <Radio value='Spouce'>Spouce</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Policy">
        <Input />
      </Form.Item>

       <Form.Item label="Group">
        <Input />
       </Form.Item>

       {/* <Form.Item label="Upload Photo" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Select
            </div>
          </div>
        </Upload>
        <button className='sixth' onClick={handleUpload}>Upload</button>
      </Form.Item>

      <Form.Item label="Upload Medical Documents" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload listType="picture-card">
          <div>
            <PlusOutlined />
            <div name="file"
              style={{
                marginTop: 8,
              }}
            >
              Select
            </div>
          </div>
        </Upload>
        <button className='sixth' onClick={handleUpload}>Upload</button>
      </Form.Item> */}
      
          <h2 className='title'>Records</h2>
          {/* Working but need to make it beautiful https://ant.design/components/upload */}
          <Form.Item>
          <section>
            <div>
          
          <label for="file">Upload Image</label>
              <input type="file" id="input" name="file" multiple />
            </div>
            <Button onClick={handleUpload}>Upload document</Button>
          </section>
          </Form.Item>
          
          <Form.Item>
          <section>
        <div>       
          <label for="file">Upload Medical Document</label>
              <input type="file" id="input" name="file" multiple />
            </div>
            <Button onClick={handleUpload}>Upload document</Button>
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
        <Button>Submit</Button>
      </Form.Item>
    </Form>
    </body>

    )
}
export default PatientDetails