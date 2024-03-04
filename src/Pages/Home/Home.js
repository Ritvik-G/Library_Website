import React, {useState} from 'react';
import { Form,InputGroup, FormControl, Button, Col, Spinner, Collapse } from 'react-bootstrap';
import {FaInfoCircle} from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import './Home.css';
import Card from './card';

function Home() {

  const [formData, setFormData] = useState({
    prompt: '',
    sentinel: '',
  });

  const data = [
    {
      text: "1. Surgical rescue strategies and techniques for severe intra-abdominal infection",
      subItems: [
        "Severe intra-abdominal infection is complicated with sepsis or septic shock and could also be named as intra-abdominal sepsis. Surgical rescue is an effective intervention for severe intra-abdominal infection, which can be caused by surgery, trauma or acute abdomen. Institutional factors associated with failure of surgical rescue include hospital volume, technology, surgeons and nurses. Patient factors contributing to failure include advanced age, diabetes mellitus and chronic organ dysfunction. The surgical rescue strategy for severe intra-abdominal infection includes damage control surgery and damage control resuscitation. Stepwise escalated procedures based on the severity of the infections should be performed as soon as possible "
      ],
      highlightedText: "Severe intra-abdominal infection, intra-abdominal sepsis, Surgical rescue, severe intra-abdominal infection, surgical rescue, chronic organ dysfunction",
      key: "Surgical, Injection",
    },
    {
      text: "2. Safety and efficacy of intraperitoneal drain placement after emergency colorectal surgery: An international, prospective cohort study.",
      subItems: [
        "Intraperitoneal drains are often placed during emergency colorectal surgery. However, there is a lack of evidence supporting their use. This study aimed to describe the efficacy and safety of intraperitoneal drain placement after emergency colorectal surgery. COMPlicAted intra-abdominal collectionS after colorectal Surgery (COMPASS) is a prospective, international, cohort study into which consecutive adult patients undergoing emergency colorectal surgery were enrolled (from 3 February 2020 to 8 March 2020). The primary outcome was the rate of intraperitoneal drain placement. Secondary outcomes included rate and time-to-diagnosis of postoperative intraperitoneal collections, rate of surgical site infections (SSIs), time to discharge and 30-day major"
      ],
      highlightedText: "Intraperitoneal drains, colorectal surgery, colorectal Surgery, intraperitoneal drain, postoperative intraperitoneal collections, surgical site infections",
      key: "Injection",
    },
    {
      text: "3. Interpretation of the Chinese expert consensus on open abdomen therapy",
      subItems: [
        "Open abdomen therapy is an effective method for the treatment of severe intra-abdominal infections, abdominal hypertension and other critical abdominal diseases. Bases on systematic reviews of indications, classification and staging of wounds, principles and approaches of open abdomen therapy, abdominal closure measures, and management of enteroatmospheric fistula, the Chinese expert consensus on open abdomen therapy provides 12 recommendations with evidence and specific explanations. This consensus is the first systematic work in China to elaborate on open abdomen therapy, helping clinicians to standardize this technique and improve the treatment outcomes of critical abdominal diseases."
      ],
      highlightedText: "Open abdominal therapy, Open abdomen therapy, severe intra-abdominal infections, open abdomen therapy, abdominal diseases, infections, intrabdominal infections, abdominal hypertension, enteroatmospheric fistula",
      key: "Surgical",
    }
  ];
  


      const additionalInfo = ["Using the MesH hierarchy to extend the vocabulary. ", "Expansion of the query using domain-specific masked language models. ", 
      "FAISS’s vector search infrastructure to retrieve top articles from PubMed. "];

      const moreInfo = ["Leveraged the MesH hierarchy to enhance vocabulary, applying a hierarchy cut-off at level 2. Relevant terms filtered using ClinicalBERT embeddings for precision.", 
      "Utilized domain-specific masked language models like ClinicalBERT for query expansion, introducing new, relevant concepts to enrich the original query.", 
      "Employed sentence transformer embeddings and FAISS vector search to efficiently retrieve the top 3 articles from PubMed, closely aligned with the query."];

     //const Similarities = ["83","78","67"];

      const loadingScreenStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
        flexDirection: 'column',
      };
      
      
    const [showLoading, setShowLoading] = useState(false);
    const [cardsVisible, setCardsVisible] = useState(false);

    const [isEditMode, setIsEditMode] = useState(true);

    const [messages, setMessages] = useState([
      'Performing Vocabulary Extension',
      'Performing Query Expansion',
      'Retrieving Relevant Articles',
    ]);

    const [messages2] = useState([
      '✅   Completed Vocabulary Extension',
      '✅   Completed Query Expansion',
      '✅   Retrieved Relevant Articles',
    ]);

    const [completedMessages, setCompletedMessages] = useState([]);
    const startProcessing = () => {
      setShowLoading(true);

      setTimeout(() => {
        setShowLoading(false);
        setCardsVisible(true);
      }, 18000);

      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[0] = messages2[0];
          return newMessages;
        });
  
        setTimeout(() => {
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[1] = messages2[1];
            return newMessages;
          });
  
          setTimeout(() => {
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              newMessages[2] = messages2[2];
              return newMessages;
            });
            setCompletedMessages(messages2);
          }, 5000);
  
        }, 5000);
  
      }, 5000);

      
    };

    const [sentiment, setSentiment] = useState(['neutral', 'neutral', 'neutral']);


    // For the user comments
    const [inputText, setInputText] = useState('');
    const [confirmedText, setConfirmedText] = useState('');

    const [autoFillSource, setAutoFillSource] = useState(null);

    const [commentInputs, setCommentInputs] = useState(Array(data.length).fill(''));
  const [editModes, setEditModes] = useState(Array(data.length).fill(true));

  const handleInputChange = (index, event) => {
    const newCommentInputs = [...commentInputs];
    newCommentInputs[index] = event.target.value;
    setCommentInputs(newCommentInputs);
  };

  const handleEditableButton = (index) => {
    const newEditModes = [...editModes];
    newEditModes[index] = !newEditModes[index];
    setEditModes(newEditModes);
  };

  const handleConfirm = (index) => {
    // Handle confirmation logic (e.g., submitting the comment)
    setEditModes((prevEditModes) => {
      const newEditModes = [...prevEditModes];
      newEditModes[index] = false;
      return newEditModes;
    });
  };

    // For the sentinel article

    const [isEditMode2, setIsEditMode2] = useState(true);

    const handleInputChange2 = (e) => {
      const { value } = e.target;
      setInputText2(value);
    };
    
  
    const handleConfirm2 = () => {
      setConfirmedText2(inputText2);
      setIsEditMode2(false);
    };

    const handleEditableButton2 = () => {
      //const tabulatedData = document.querySelector('.tabulated-data');
      //tabulatedData.style.display = 'none';
      //setVisibleScores(Array(Similarities.length).fill(false));
      setConfirmedText2('');
      setIsEditMode2(true);
    };

   

    const [inputText2, setInputText2] = useState('');
    const [confirmedText2, setConfirmedText2] = useState('');

    const handleFeedbackSubmit = (feedbackData) => {
      // Update the sentiment array at the specified index
      const updatedSentiment = [...sentiment];
      updatedSentiment[feedbackData.index] = feedbackData.rating === 'positive';
      setSentiment(updatedSentiment);
    };

    const submitFeedback = () => {
      //alert("Submission Successful")
      // alert(sentiment)
    }

    const completedInfo = ["Message 1", "Message 2", "Message 3"];
    const [infoContent, setInfoContent] = useState(Array(completedInfo.length).fill(''));
    const tableInfo = ["Shows the similarity (cosine similarity)","between the embeddings of the retrieved articles and the sentinel articles."]
    const [tableInfoContent, setTableInfoContent] = useState('');

    const handleInfoHover = (index) => {
      // Set the content for the specific index
      setInfoContent((prevContent) => {
        const newContent = [...prevContent];
        newContent[index] = (<> {additionalInfo[index]}{' '} <span style={{ fontSize: 'small' }}>(click info for more)</span> </> );;
        return newContent;
      });
    };

    const handleInfoClick = (index) => {
      // Set the content for the specific index
      setInfoContent((prevContent) => {
        const newContent = [...prevContent];
        newContent[index] = additionalInfo[index] + ' ' +moreInfo[index];
        return newContent;
      });
    };

    const handleInfoLeave = (index) => {
      // Clear the content when leaving
      setInfoContent((prevContent) => {
        const newContent = [...prevContent];
        newContent[index] = '';
        return newContent;
      });
    };


    const handleInfoHover2 = () => {
      // Set the content for the specific index
      setTableInfoContent(
        <>
          {tableInfo[0]} <span style={{ fontSize: 'small' }}>(click info for more)</span>
        </>
      );
    };

    const handleInfoClick2 = () => {
      // Set the content for the specific index
        setTableInfoContent(`${tableInfo[0]} ${tableInfo[1]}`);
    };

    const handleInfoLeave2 = () => {
      // Clear the content when leaving
      setTableInfoContent('');
    };

    const autoFill1 = () => {
      setAutoFillSource('Generate1');
      setInputText2("1. Olmez, T., Berkesoglu, M., Turkmenoglu, O., & Colak, T. (2019). Effect of Triclosan-Coated Suture on Surgical Site Infection of Abdominal Fascial Closures. Surgical infections, 20(8), 658–664. https://doi.org/10.1089/sur.2019.052 \n2. Okada, N., Nakamura, T., •Ambo, Y., Takada, M., Nakamura, F., Kishida, A., & Kashimura, N. (2014). Triclosan-coated abdominal closure sutures reduce the incidence of surgical site infections after pancreaticoduodenectomy. Surgical infections, 15(3), 305–309. https://doi.org/10.1089/sur.2012.170")
      const autoFilledData = {
        ...formData,
        prompt: 'Antimicrobial agents and suture techniques on the prevention of surgical site infections' 
      };

      setFormData(autoFilledData);
    }

    const autoFill2 = () => {
      setAutoFillSource('Generate2');
      setInputText2("Test 2");
      const autoFilledData = {
        ...formData,
        prompt: 'Generated content for Generate 2'
      };
      setFormData(autoFilledData);
    }

    
    return (
      <>
      <div className="about-title">
            <h2>GEAR UP</h2>
      </div>
      <div className="about-about">
            <p>
                Please fill your prompt here to receive the responses from the LLM. 
                If any mistakes are made, please aid us in understanding the mistakes through the suggestions box provided.
                Thank you for your interest.
            </p>
      </div>
      <div className='card2'>
        <InputGroup>
          <FormControl id ='prompt' 
          placeholder="Please type your prompt here"
          value={formData.prompt}
          onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
           />
        </InputGroup>
        <br/>
        <Form>
              <Form.Group className="mb-3" controlId="">
              <Form.Label size="lg">Sentinel Article</Form.Label>
              {isEditMode2 && (
                <Form.Control
                  id = 'sentinel'
                  as="textarea"
                  rows={3}
                  value={inputText2}
                  onChange={handleInputChange2}
                  placeholder="Please upload the contents of your sentinel article"
                />
                
              )}
              <br/>
              {isEditMode2 ? (
                <Button variant="outline-success" onClick={handleConfirm2}>Confirm</Button>
              ) : (
                <div>
                  <div className='commented-text2'>
                    <p>{confirmedText2}</p>
                  </div>
                  <Button variant="outline-dark" onClick={handleEditableButton2}>Edit</Button>
                </div>
              )}
            </Form.Group>
          </Form>
          <div className="centered-button-container">
          <Button variant="outline-primary" onClick={autoFill1}>AutoFill 1</Button>
          &emsp;
          <Button variant="outline-primary" onClick={startProcessing}>Submit</Button>
          &emsp;
          <Button variant="outline-primary" onClick={autoFill2}>AutoFill 2</Button>
          </div>
      </div>
      
      {showLoading ? (
        <div style={loadingScreenStyle} className="loading-screen">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <br/>
            {messages.map((message, index) => (
              <p key={index}>{message}</p> 
            ))}
        </div>
      ) : cardsVisible ? (
        
      <div className='response-box'>
          <div className='comment-box'>
            

          <Table className='tabulated-data'>
            <thead>
              <tr>
                <th>#
                <button
                  className='info-buttons'
                  onMouseEnter={() => handleInfoHover2()}
                  onMouseLeave={() => handleInfoLeave2()}
                  onClick = {()=> handleInfoClick2()}
                >
                  <FaInfoCircle />
                </button>
                <span className="info-content">{tableInfoContent}</span>
                </th>
                
                
                <th>Retrieved Article 1</th>
                <th>Retrieved Article 2</th>
                <th>Retrieved Article 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Avg. Sentinel Article Score</td>
                <td>0.81</td>
                <td>0.73</td>
                <td>0.57</td>
              </tr>
              
            </tbody>
          </Table>
          </div>
        <div className='comment-box'>
              {completedMessages.map((message, index) => (
              <p key={index}>
                {message}{' '}
                <button
                  className='info-buttons'
                  onMouseEnter={() => handleInfoHover(index)}
                  onMouseLeave={() => handleInfoLeave(index)}
                  onClick = {()=> handleInfoClick(index)}
                >
                  <FaInfoCircle />
                </button>
                <span className="info-content">{infoContent[index]}</span>
                
              </p>
            ))}
        </div>
        {data.map((item, index) => (
        <Col key={index}>
          <Card data={{ ...item, index }} onFeedbackSubmit={handleFeedbackSubmit} />
          <div className='comment-box'>
            <Form>
              <Form.Group className="mb-3" controlId="">
                <Form.Label size="lg">Comments on the retrieved article</Form.Label>
                {editModes[index] && (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={commentInputs[index]}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder="Enter text"
                  />
                )}
                <br />
                {editModes[index] ? (
                  <Button variant="outline-secondary" onClick={() => handleConfirm(index)}>
                    Confirm
                  </Button>
                ) : (
                  <div>
                    <div className='commented-text'>
                      <p>{commentInputs[index]}</p>
                    </div>
                    <Button variant="outline-secondary" onClick={() => handleEditableButton(index)}>
                      Edit
                    </Button>
                  </div>
                )}
              </Form.Group>
            </Form>
          </div>
        </Col>
      ))}
          <div className='comment-box'>
            <div className="centered-button-container"> 
            <Button variant="outline-primary" size="lg" onClick={submitFeedback}>Submit</Button>
            </div>
        </div>
      </div>
      ) : null}
      </>
    );
  }
  export default Home;