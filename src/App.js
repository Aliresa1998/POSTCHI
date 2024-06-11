// Developed by: Alireza
import React, {useState} from 'react';
import {Col, Avatar, Row, Form, Input, Button, Select, Table, notification, Typography, Divider} from 'antd';
import {PlusOutlined, InstagramOutlined, MailOutlined, LinkedinOutlined} from '@ant-design/icons';

// import icon
import PostIcon from "./postchi.png";
import me from "./me.jpg";


const {Option} = Select;
const {Title, Text} = Typography;

const App = () => {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState([{key: 'Content-Type', value: 'application/json'}]);
    const [body, setBody] = useState('');
    const [response, setResponse] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddHeader = () => {
        setHeaders([...headers, {key: '', value: ''}]);
    };

    const handleHeaderChange = (index, key, value) => {
        const newHeaders = [...headers];
        newHeaders[index][key] = value;
        setHeaders(newHeaders);
    };

    const handleRemoveHeader = (index) => {
        const newHeaders = headers.filter((_, i) => i !== index);
        setHeaders(newHeaders);
    };

    const handleFetch = async () => {
        setLoading(true);
        setResponse(null);
        setStatus(null);

        const headersObj = headers.reduce((acc, header) => {
            if (header.key && header.value) {
                acc[header.key] = header.value;
            }
            return acc;
        }, {});

        try {
            const options = {
                method,
                headers: headersObj,
                body: ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined,
            };

            const res = await fetch(url, options);
            const resData = await res.json();

            setResponse(resData);
            setStatus(res.status);
            notification.success({message: `Request successful with status ${res.status}`});
        } catch (error) {
            setResponse(error.message);
            notification.error({message: `Request failed: ${error.message}`});
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                    placeholder="Header Key"
                />
            ),
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                    placeholder="Header Value"
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Button type="link" onClick={() => handleRemoveHeader(index)}>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <div className="container">
            <Row justify={"center"}><img width={"65"} height={"65"} src={PostIcon} alt={"post"}/></Row>
            <Title style={{marginTop: "0px"}} level={2} className="title">POSTCHI</Title>

            <Form layout="vertical">
                <Form.Item label="URL" className="form-item">
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL"/>
                </Form.Item>
                <Form.Item label="Method" className="form-item">
                    <Select value={method} onChange={(value) => setMethod(value)}>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                        <Option value="PUT">PUT</Option>
                        <Option value="DELETE">DELETE</Option>
                        <Option value="PATCH">PATCH</Option>
                    </Select>
                </Form.Item>
                {['POST', 'PUT', 'PATCH'].includes(method) && (
                    <Form.Item label="Body" className="form-item">
                        <Input.TextArea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={4}
                            placeholder="Enter JSON body"
                        />
                    </Form.Item>
                )}

                <Form.Item label="Headers" className="form-item">
                    <Table
                        dataSource={headers}
                        columns={columns}
                        pagination={false}
                        rowKey={(record, index) => index}
                        className="table-header"
                    />
                    <Button
                        type="dashed"
                        onClick={handleAddHeader}
                        className="button-add-header"
                        icon={<PlusOutlined/>}
                    >
                        Add Header
                    </Button>
                </Form.Item>

                <Form.Item className="form-item">
                    <Button type="primary" onClick={handleFetch} loading={loading} className="button-primary">
                        Send Request
                    </Button>
                </Form.Item>
            </Form>
            {status && (
                <div className="response-container">
                    <Divider className="response-title">Response</Divider>
                    <Text strong className="response-status">Status: {status}</Text>
                    <pre className="response-body">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            <Divider className="response-title">Contact</Divider>
            <Row className={"footer-name"} align={"middle"}>

                <Avatar className={"footer-name"} size={"large"} src={me} alt={"me"}/>
                <span className={"ml5"}> Alireza Sadeqi</span>
                {/*<a className={"ml5"} href={"https://www.linkedin.com/in/alireza-sadeqi/"}>{" "}Alireza</a>*/}

            </Row>
            <Row className={"mt15"} justify={"center"} gutter={[20]}>
                <Col>
                    <a className={"ml5"} href={"https://www.linkedin.com/in/alireza-sadeqi/"}>
                        <LinkedinOutlined className={"social-icon"}/>
                    </a>
                </Col>
                <Col>
                    <a className={"ml5"} href={"https://www.instagram.com/arsdghi/"}>
                        <InstagramOutlined className={"social-icon"}/>
                    </a>
                </Col>
                <Col>
                    <a className={"ml5"} href={"mailto:"}>
                        <MailOutlined className={"social-icon"}/>
                    </a>
                </Col>

            </Row>
        </div>
    );
};

export default App;
