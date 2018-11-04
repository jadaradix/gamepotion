import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import api from '../../state/api'
import { font } from '../../styleAbstractions'
import icons from '../../icons'

const StyledUploader = styled.div`
  @keyframes gmc-loading {
    100% { transform: rotate(360deg); }
  }
  border: 2px dashed #dadfe1;
  border-radius: 4px;
  cursor: copy;
  img {
    display: block;
    width: 48px;
    margin: 1rem auto 0.25rem auto;
    // background-color: yellow;
  }
  img.icon--upload {
  }
  img.icon--loading {
    animation: gmc-loading 4s linear infinite;
  }
  p {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    ${font}
    text-align: center;
    color: #6c7a89;
  }
`

class Uploader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false
    }
    this.onDropAccepted = this.onDropAccepted.bind(this)
    this.onFileDialogCancel = this.onFileDialogCancel.bind(this)
  }

  onDropAccepted(files) {
    if (files.length === 0) return
    this.setState({
      inProgress: true
    })
    const formData = new FormData()
    formData.append('bin', files[0])
    api.uploadBin(this.props.route, formData)
      .then(() => {
        this.setState({
          inProgress: false
        })
        this.props.onDone()
      })
  }

  onFileDialogCancel() {
    this.setState({
      inProgress: false
    })
  }

  render() {
    return (
      <StyledUploader className='component--uploader'>
        {this.state.inProgress === true &&
          <Fragment>
            <img src={icons.generic.loading} className='icon--loading' alt='' />
            <p>Uploading...</p>
          </Fragment>
        }
        {this.state.inProgress === false &&
          <Dropzone
            accept={this.props.mimeTypes.join(', ')}
            onDropAccepted={this.onDropAccepted}
            onFileDialogCancel={this.onFileDialogCancel}
            style={{}}
          >
            {({ isDragActive, isDragReject }) => {
              if (isDragReject) {
                return (
                  <Fragment>
                    <img src={icons.generic.upload} className='icon--upload' alt='' />
                    <p>You can&rsquo;t upload this file.</p>
                  </Fragment>
                )
              }
              if (isDragActive) {
                return (
                  <Fragment>
                    <img src={icons.generic.upload} className='icon--upload' alt='' />
                    <p>You can upload this file.</p>
                  </Fragment>
                )
              }
              return (
                <Fragment>
                  <img src={icons.generic.upload} className='icon--upload' alt='' />
                  <p>Drop a file here or click to upload.</p>
                </Fragment>
              )
            }}
          </Dropzone>
        }
      </StyledUploader>
    )
  }
}

Uploader.propTypes = {
  route: PropTypes.string.isRequired,
  onDone: PropTypes.func,
  mimeTypes: PropTypes.array.isRequired
}

Uploader.defaultProps = {
  onDone: () => {}
}

export default Uploader
