import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack } from '@mui/material';
import productEmptyImg from 'assets/images/products/product-empty.png';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    position: 'relative',
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

const removeImage = {
    position: 'absolute',
    right: '9px',
    color: 'black',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 'large'
};

const dropzone = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
};

export function FileUploadField({ name, control }) {
    const {
        field: { value, onChange }
    } = useController({
        name,
        control
    });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setFiles((prev) => [...prev, { preview: value }]);
    }, [value]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
            onChange(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const handleRemoveImage = (idx) => {
        setFiles((prev) => prev.filter((_, index) => index !== idx));
        onChange(files.filter((_, index) => index !== idx));
    };

    const thumbs = files.map((file, idx) => (
        <div style={thumb} key={idx}>
            <div
                role="button"
                tabIndex={0}
                style={removeImage}
                onClick={() => handleRemoveImage(idx)}
                onKeyDown={() => handleRemoveImage(idx)}
            >
                x
            </div>
            <div style={thumbInner}>
                <img src={file.preview || productEmptyImg} style={img} alt="" />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone', style: dropzone })}>
                <input {...getInputProps()} />
                <Stack direction="row" spacing={1} alignItems="flex-end">
                    <CloudUploadIcon />
                    <span>Drop file here to upload</span>
                </Stack>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
}
