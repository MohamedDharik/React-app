import {Modal,Button,Form,Card} from 'react-bootstrap'

export default function Resetpass(){
    return (
        <>
        
        <div className=' Card d-flex justify-content-center align-items-center vh-100'>
       <div className=' p-4 border-primary' style={{ width: '400px' }}>
       <h3 className='d-flex justify-content-center'>Forget Password</h3>
       <Card className='px-5 py-5 border-light shadow-lg p-3 mb-5 bg-body rounded'>
      <Form>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        className='mb-3 form-control' 
        placeholder='Enter your Username' 
      />
      <input 
        type="password" 
        onChange={(e) => setCurrentPassword(e.target.value)}
        className='mb-3 form-control' 
        placeholder='Enter your Current Password' 
      />
      <input 
        type="password" 
        onChange={(e) => setNewPassword(e.target.value)}
        className='mb-3 form-control' 
        placeholder='Enter your New Password' 
      />
      <input 
        type="password" 
        onChange={(e) => setConfirmPassword(e.target.value)}
        className='mb-3 form-control' 
        placeholder='Confirm your New Password' 
      />
      <Button className='bg-success text-light border-success'>Reset</Button> <Button className='bg-danger text-light border-danger '>exit</Button> 
    </Form>
    </Card>
  </div>
</div>

        </>
    )
}