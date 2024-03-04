import React, {useState} from 'react';
import { Form,InputGroup, FormControl, Button, Col, Spinner} from 'react-bootstrap';
import {FaInfoCircle} from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import './Home.css';
import Card from './card';
import axios from 'axios';

function Home() {
  const API_URL = "http://localhost:5000/" // Replace with the actual API URL

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

  // Info boxes
  const additionalInfo = ["Using the MesH hierarchy to extend the vocabulary. ", "Expansion of the query using domain-specific masked language models. ", 
      "FAISS’s vector search infrastructure to retrieve top articles from PubMed. "];

  const moreInfo = ["Leveraged the MesH hierarchy to enhance vocabulary, applying a hierarchy cut-off at level 2. Relevant terms filtered using ClinicalBERT embeddings for precision.", 
  "Utilized domain-specific masked language models like ClinicalBERT for query expansion, introducing new, relevant concepts to enrich the original query.", 
  "Employed sentence transformer embeddings and FAISS vector search to efficiently retrieve the top 3 articles from PubMed, closely aligned with the query."];

  const completedMessages = ['✅   Completed Vocabulary Extension', '✅   Completed Query Expansion', '✅   Retrieved Relevant Articles']

  // Input Data
  const [prompt, setPrompt] = useState('');
  const [data, setData] = useState([]);

  // Loading Screens
  const [showLoading, setShowLoading] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  // Feedback Response
  const [feedback, setFeedback] = useState(''); 
  const [sentiment, setSentiment] = useState(['neutral', 'neutral', 'neutral']);

  setData([{'Key': 'infections', 'Title': 'Oritavancin Versus Daptomycin for Osteomyelitis Treatment After Surgical Debridement.', 'Score': 66.71408081054688, 'Context': 'of initial therapy (OR 2.13; p < 0.001). Repeat surgical debridement was required for 68.0% with daptomycin vs. 23.1% with oritavancin (p < 0.001). Oritavancin demonstrated a significantly higher rate of clinical success compared to daptomycin, with lower all-cause and infection-related readmissions, reduced need for repeat surgical debridement, and fewer additional antibiotic requirements.', 'Highlights': ['initial therapy', 'repeat surgical debridement', 'daptomycin', 'oritavancin', 'oritavancin', 'daptomycin', 'all - cause and infection - related readmission', 'repeat surgical debridement', 'additional antibiotic requirements']}, {'Key': 'infections', 'Title': 'Clinical analysis of infectious endophthalmitis following glaucoma filtration surgery.', 'Score': 66.00025939941406, 'Context': 'outpatient services, early diagnosis, and timely treatment may rescue vision and maintain IOP control in the presence of BAE.', 'Highlights': ['timely treatment', 'iop control']}, {'Key': 'infections', 'Title': 'Oritavancin Versus Daptomycin for Osteomyelitis Treatment After Surgical Debridement.', 'Score': 65.94689178466797, 'Context': 'acute osteomyelitis who were treated with oritavancin or daptomycin (1:1) following extensive surgical debridement were identified. Staphylococcus aureus was the most common pathogen (n = 117). No patient in either group received prior antibiotic therapy (previous 30 days) or was hospitalized within 90 days prior to surgical debridement. Twenty-one (28%) patients prescribed oritavancin had chronic kidney disease, seven of whom were receiving hemodialysis or peritoneal dialysis. Compared to oritavancin, patients prescribed daptomycin had higher rates of all-cause readmission [odds ratio (OR) 2.89; p < 0.001], more infection-related readmission (OR 3.19; p < 0.001), and greater likelihood of receiving antibiotics post-discontinuation', 'Highlights': ['acute osteomyelitis', 'oritavancin', 'daptomycin', 'extensive surgical debridement', 's', '##taphylococcus aureus', 'pathogen', 'prior antibiotic therapy', 'surgical debridement', 'oritavan', 'chronic kidney disease', 'hemodialysis', 'peritoneal dialysis', '##cin', 'daptomycin', 'all - cause readmission', 'more infection - related readmission', 'antibiotics']}])
  
  const fetchData = async () => {
    try {
      setShowLoading(true);

      const response = await axios.get(API_URL, {
        params: { query: prompt }, 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      //setData(response.data);
      alert(response.data);
      setShowLoading(false);
      setCardsVisible(true);
        alert(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setShowLoading(false);
      alert("Error occured while fetching the data. Please try again.");
    }
  };


  // const submitFeedback = async () => {
  //   try {
  //     const response = await axios.post( `${API_URL}/submit_feedback`,
  //       {
  //         feedback: feedback,
  //         sentiments: sentiment,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //     alert("Feedback Submitted. Thank You.");
  //     window.location.replace('/');

  //   } catch (error) {
  //     console.error('Error submitting feedback:', error);
  //     alert("Error occured while submitting the feedback. Please try again.");
  //   }
  // };

  // For the user comments
  const [autoFillSource, setAutoFillSource] = useState(null);
  const [commentInputs, setCommentInputs] = useState(Array(data.length).fill(''));
  const [editModes, setEditModes] = useState(Array(data.length).fill(true));

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  }
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

  const startProcessing = () => {
    alert(data)
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
        onChange={handlePromptChange}
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
        <Button variant="outline-primary" onClick={startProcessing}>Submit</Button>
        </div>
    </div>
    
    {showLoading ? (
      <div style={loadingScreenStyle} className="loading-screen">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
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