import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import api from '../../state/api'
import { font } from '../../styleAbstractions'
import icons from '../../icons'

const StyledUploader = styled.div`
  @keyframes oscar-loading {
    100% { transform: rotate(360deg); }
  }
  border: 2px dashed #dadfe1;
  border-radius: 4px;
  cursor: copy;
  &.component--uploader-in-progress {
    cursor: wait;
  }
  &.component--uploader-done {
    cursor: default;
  }
  img {
    display: block;
    width: 48px;
    height: 48px;
    margin: 1rem auto 0.25rem auto;
    // background-color: yellow;
  }
  img.icon--upload {
  }
  img.icon--upload-done {
  }
  img.icon--loading {
    animation: oscar-loading 4s linear infinite;
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
      inProgress: false,
      isDone: false
    }
    this.onDropAccepted = this.onDropAccepted.bind(this)
    this.onFileDialogCancel = this.onFileDialogCancel.bind(this)
    this.doneTimeout = null
  }

  componentWillUnmount() {
    window.clearTimeout(this.doneTimeout)
  }

  onDropAccepted(files) {
    if (files.length === 0) return
    this.setState({
      inProgress: true,
      isDone: false
    })
    const formData = new FormData()
    formData.append('bin', files[0])
    api.uploadBin(this.props.route, formData)
      .then(() => {
        this.setState({
          inProgress: false,
          isDone: true
        })
        this.doneTimeout = window.setTimeout(() => {
          this.setState({
            inProgress: false,
            isDone: false
          })
        }, 1000)
        this.props.onDone()
      })
  }

  onFileDialogCancel() {
    this.setState({
      inProgress: false,
      isDone: false
    })
  }

  render() {
    const className = (() => {
      if (this.state.inProgress) {
        return 'component--uploader-in-progress'
      }
      if (this.state.isDone) {
        return 'component--uploader-done'
      }
    })()
    return (
      <StyledUploader className={`component--uploader ${className}`}>
        {this.state.isDone === true &&
          <Fragment>
            <img src={icons.generic.uploadDone} className='icon--upload-done' alt='' />
            <p>Done!</p>
          </Fragment>
        }
        {this.state.inProgress === true &&
          <Fragment>
            <img src={icons.generic.uploadInProgress} className='icon--loading' alt='' />
            <p>Uploading...</p>
          </Fragment>
        }
        {this.state.inProgress === false && this.state.isDone === false &&
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
