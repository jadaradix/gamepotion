import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import api from '../../api'
import icons from '../../icons'

const StyledUploader = styled.div`
  @keyframes gmc-in-progress {
    100% { transform: rotate(360deg); }
  }
  height: 128px;
  border: 2px dashed #dadfe1;
  border-radius: 4px;
  cursor: copy;
  &.component--uploader-in-progress {
    cursor: wait;
  }
  &.component--uploader-done {
    cursor: default;
  }
  > div {
    position: relative;
    height: 100%;
    img.icon {
      display: block;
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto 0.25rem auto;
      // background-color: yellow;
    }
    img.icon--in-progress {
      animation: gmc-in-progress 4s linear infinite;
    }
  }
`

const RESET_TIME = 1.5 * 1000

class Uploader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      isDone: false,
      hasErrored: false
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
      isDone: false,
      hasErrored: false
    })
    const formData = new FormData()
    formData.append('bin', files[0])
    api.uploadBin(this.props.route, formData)
      .then(data => {
        this.setState({
          inProgress: false,
          isDone: true,
          hasErrored: false
        })
        this.doneTimeout = window.setTimeout(() => {
          this.setState({
            inProgress: false,
            isDone: false,
            hasErrored: false
          })
        }, RESET_TIME)
        this.props.onDone(data)
      })
      .catch(() => {
        this.setState({
          inProgress: false,
          isDone: false,
          hasErrored: true
        })
        this.doneTimeout = window.setTimeout(() => {
          this.setState({
            inProgress: false,
            isDone: false,
            hasErrored: false
          })
        }, RESET_TIME)
      })
  }

  onFileDialogCancel() {
    this.setState({
      inProgress: false,
      isDone: false,
      hasErrored: false
    })
  }

  render() {
    const className = (() => {
      if (this.state.inProgress) {
        return ' component--uploader-in-progress'
      }
      if (this.state.isDone) {
        return ' component--uploader-done'
      }
      if (this.state.hasErrored) {
        return ' component--uploader-errored'
      }
      return ''
    })()
    return (
      <StyledUploader className={`component--uploader${className}`}>
        {this.state.inProgress === true &&
          <div><img src={icons.generic.uploadInProgress} className='icon icon--in-progress' alt='' /></div>
        }
        {this.state.isDone === true &&
          <div><img src={icons.generic.uploadDone} className='icon icon--done' alt='' /></div>
        }
        {this.state.hasErrored === true &&
          <div><img src={icons.generic.uploadErrored} className='icon icon--errored' alt='' /></div>
        }
        {this.state.inProgress === false && this.state.isDone === false && this.state.hasErrored === false &&
          <Dropzone
            accept={this.props.mimeTypes.join(', ')}
            onDropAccepted={this.onDropAccepted}
            onFileDialogCancel={this.onFileDialogCancel}
            style={{}}
          >
            {({ isDragActive, isDragReject }) => {
              if (isDragReject) {
                return (
                  <img src={icons.generic.uploadErrored} className='icon' alt='' />
                )
              }
              if (isDragActive) {
                return (
                  <img src={icons.generic.uploadDone} className='icon' alt='' />
                )
              }
              return (
                <img src={icons.generic.upload} className='icon' alt='' />
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
