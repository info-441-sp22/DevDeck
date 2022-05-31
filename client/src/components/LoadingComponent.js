import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/LoadingComponent.css';

export default function LoadingComponent() {
    return (
        <div className="spinner-container">
            <FontAwesomeIcon 
                className="spinner-item"
                spin={true} 
                icon={faSpinner} 
            />
        </div>
    );
}   