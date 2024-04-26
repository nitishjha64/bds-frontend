import LoadingOverlay from 'react-loading-overlay-ts'
import PropagateLoader from 'react-spinners/PropagateLoader'

const LoaderCustom = ({ active, text }) => {
    return (
      <LoadingOverlay
        active={active}
        spinner={<PropagateLoader color="#fff" />}
      >
      </LoadingOverlay>
    )
}

export default LoaderCustom