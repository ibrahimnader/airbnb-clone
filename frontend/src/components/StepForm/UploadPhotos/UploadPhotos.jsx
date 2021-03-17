import './UploadPhotos.css';
import React, { useEffect, useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { AppContext } from '../../../contexts/AppContext';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify'; 

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

export const UploadPhotos = ({ formData, setForm, navigation, edit, data }) => {
    const history = useHistory()

    console.log(formData, edit, data);
    const [files, setFiles] = useState([]);
    const [uploadedPhotos, setUploadedPhotos] = useState(false);
    const { token } = useContext(AppContext);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles: 5,
        multiple: true,
        onDrop: acceptedFiles => {
            setUploadedPhotos(true);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks

        files.forEach(file => {
            console.log(151, file);
            URL.revokeObjectURL(file.preview)
        });
    }, [files]);


    function handleSubmit() {
        console.log(files);
        if (edit) {
            if (uploadedPhotos && files.length !== 5) {
                alert('please upload 5 photos');
            }
        } else {
            if (files.length !== 5) {
                alert('please upload 5 photos');
            }
        }
        const aminities = {
            wifi: formData.wifi,
            tv: formData.tv,
            ac: formData.ac,
            shampoo: formData.shampoo,
            iron: formData.iron,
            fireplace: formData.fireplace,
            heat: formData.heat
        }
        const location = {
            country: formData.country,
            city: formData.city,
            street: formData.street
        }
        console.log(formData);

        const myForm = new FormData();
        if ((edit && uploadedPhotos) || !edit) {
            myForm.append('file1', files[0]);
            myForm.append('file2', files[1]);
            myForm.append('file3', files[2]);
            myForm.append('file4', files[3]);
            myForm.append('file5', files[4]);
        }

        myForm.append('title', formData.title);
        myForm.append('description', formData.description);
        myForm.append('address', formData.address);
        myForm.append('price', formData.price);
        myForm.append('propertyType', formData.type);

        myForm.append('guests', formData.guests);
        myForm.append('beds', formData.beds);
        myForm.append('bathrooms', formData.bathrooms);
        myForm.append('bedrooms', formData.bedrooms);

        myForm.append('aminities', JSON.stringify(aminities));
        myForm.append('location', JSON.stringify(location));

        if (edit) {

            axios.put(`http://localhost:8000/api/v1/places/${data._id}`, myForm, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res);
                history.push("/dashboard")
            }).catch((err) => {
                console.log(err.response);
                toast('Something Went wrong!', {
                    type:'error'
                })
            })
        } else {

            axios.post('http://localhost:8000/api/v1/places/create', myForm, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                history.push("/dashboard")
            }).catch((err) => {
                console.log(err.response);
                toast('Something Went wrong!', {
                    type:'error'
                })
            })
        }
    }


    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    let oldPhotos;
    if (edit) {
        oldPhotos = data.images.map(url => {
            console.log(`http://localhost:8000/uploads/${url}`);
            return (<div style={thumb} key={url}>
                <div style={thumbInner}>
                    <img
                        src={`http://localhost:8000/uploads/${url}`}
                        style={img}
                    />
                </div>
            </div>)
        });
    }


    return (
        <>
            <ProgressBar now={100} />
            <section className="container upload_section">
                <div {...getRootProps({ className: 'dropzone' })} className="uploadInput">
                    <input {...getInputProps()} />
                    <p className="p_photos">Upload 5 photos for your place</p>
                </div>
                {
                    uploadedPhotos ?
                        <aside style={thumbsContainer} className="photos_uploaded">
                            {thumbs}
                        </aside> :
                        <aside style={thumbsContainer} className="photos_uploaded">
                            {oldPhotos}
                        </aside>
                }
                <button onClick={handleSubmit} className="btn btn_start">Submit Now</button>
            </section>
        </>
    );
}
