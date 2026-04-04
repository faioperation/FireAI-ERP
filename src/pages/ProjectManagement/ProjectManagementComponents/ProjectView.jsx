// import React from 'react'
// import Redesign from './Redesign'
// import Milestones from './Milestones'

// const ProjectView = () => {
//   return (
//     <>
//     <Redesign/>
//     <div className='mt-8'>
//         <Milestones/>
//     </div>
//     </>
//   )
// }

// export default ProjectView

import React from 'react';
import { useParams } from 'react-router';
import Redesign from './Redesign';
import Milestones from './Milestones';

const ProjectView = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <Redesign projectId={id} />

      <div className='mt-8'>
        <Milestones projectId={id} />
      </div>
    </div>
  );
};

export default ProjectView;