 <?  isMethod('get')){
   $sessions = SessionInfo::get();
   return Response::json([
       'response' => true,
       'message' => 'All the Sessions',
       'result'  =>  $sessions
       ]);
   }

  if($request->isMethod('post')){
   //$id = $request->session_id;
   $postdata = file_get_contents("php://input");
            $data=json_decode($postdata, true);
            //echo ""; print_r($data['session_id']); die;
   $id = $data['session_id'];
   $count = SessionInfo::where('id', $id)->count();
   if($count != 0) {
   $session_info = DB::table('sessions')->where('id', $id)->first();
   $requester_id = $session_info->requester_id;
   $requester = DB::table('requesters')->select('first_name','last_name','id')->where('id',$requester_id)->first();
   // print_r($requester); die;
   return Response::json([
      'response' => true,
      'message' => 'Session Info',
      'session_details'  =>  $session_info,
      'requester_details' =>  $requester
      ]);
   }
   else {
    return Response::json([
      'response' => true,
      'message' => 'No such sessions',
      ]);
   }
  }
 }
 public function response(Request $request) 
 {
  if($request->isMethod('POST')) {
   $postdata = file_get_contents("php://input");
           $data=json_decode($postdata, true);

   $session_id     =   $data['session_id'];
   $responder_id   =   $data['responder_id'];
   $count = DB::table('pinned_audition')->where('responder_id', $responder_id)->where('session_id',$session_id)->count();
   if($count insert(['responder_id' => $responder_id, 'session_id' => $session_id])) {
     return Response::json([
       'response' => true,
       'message' => 'Data Successfully inserted',
       ]);
     }
   }
   else {
    return Response::json([
       'response' => false,
       'message' => 'Responder already responded to this session',
       ]);
     }
   }
 }

///////////////////////////////////////*Requester Info*//////////////////////////////////////////////////
 public function requesterInfo(Request $request)
 {
  if($request->isMethod('post')) {
   $postdata = file_get_contents("php://input");
                   $data=json_decode($postdata, true);
              //echo ""; print_r($data['email']); die;
                $id = $data['requester_id'];
   //$id = $request->id;
   
   $requester = MyRequester::where('id',$id)->first();
   return Response::json([
      'response' => true,
      'message' => 'Session Info',
      'result'  =>  $requester
      ]);
   
   }
  
 }
///////////////////////////////////////////////////*Invitations*/////////////////////////////////////////
 public function respondersInvitations(Request $request)
 {
  if($request->isMethod('post')) {
   //$responder_id = $request->responder_id;
   $postdata = file_get_contents("php://input");
           $data=json_decode($postdata, true);
      //echo ""; print_r($data['email']); die;
      $responder_id = $data['responder_id'];
   $all_sessions = '';
   $invitations = DB::table('invitations')->where('responder_id', $responder_id)->get();
   $all_sessions=array();
    foreach ($invitations as $invite) {
    $session_id = $invite->session_id;  
    $sessions = DB::table('sessions')->where('id',$session_id)->get();
    $all_sessions=array_merge($all_sessions,$sessions);
    }
    return Response::json([
      'response' => true,
      'message' => 'Session Info',
      'result'  =>  $all_sessions
      ]);
   
    

  }
 }

//////////////////////////////////////*Session Questions*///////////////////////////////////////////
 public function sessionsQuestions(Request $request) 
 {
  if($request->isMethod('post')) {
   $postdata = file_get_contents("php://input");
           $data=json_decode($postdata, true);
      //echo ""; print_r($data['email']); die;
      $session_id = $data['session_id'];
      $session_question = ' ';
   // $session_id = $request->session_id;
   $count = DB::table('session_questions')->where('session_id',$session_id)->count();
   if($count  false,
      'message' => 'This session doesnt have any questions yet',
      ]);
   }
   else {
    $session_questions = DB::table('session_questions')->select('id','question')->where('session_id',$session_id)->get();
    //dd($session_questions);
    /*$ques_arr=array();
    $i=0;
    foreach ($session_questions as $key => $sq) {
      $quess_arr['qid'][$i]=$sq->id;
      $quess_arr['ques'][$i]=$sq->question;
      $i++;
     //$session_question .=$sq->question;
    }
     dd($quess_arr);*/ 
    return Response::json([
      'response' => true,
      'message' => 'following are the quesions foe the given session',
      'result'  =>  $session_questions
      ]);

   }
  }
 }
 public function sessionsAnswers(Request $request)
 {
  if($request->isMethod('post')){
   $postdata = file_get_contents("php://input");
           $data=json_decode($postdata, true);
      // echo ""; print_r($data); die;
      $session_answers = array();
      $responder_id = $data['responder_id'];
      $ques_ans = $data['answer'];
      $session_answers['responder_id'] = $responder_id;
      foreach($ques_ans as $key=>$val) {
 $count = DB::table('session_answers')->where('responder_id', $responder_id)->where('question_id', $key)->count();
   if($count == 0) {
       $session_answers = new sessionAnswers;
       $session_answers->question_id = $key;
       $session_answers->responder_id = $responder_id;
       $session_answers->session_id = ' ';
       $session_answers->answer =  $val;
       $session_answers->question = ' ';
       $session_answers->save();
       }
      else {
       $sa_update = sessionAnswers::where('responder_id', $responder_id)->where('question_id', $key)->first();
       $sa_update->question_id = $key;
       $sa_update->responder_id = $responder_id;
       $sa_update->session_id = ' ';
       $sa_update->answer =  $val;
       $sa_update->question = ' ';
       $sa_update->save();
      }
     }
      return Response::json([
       'response' => true,
       'message' => 'data inserted/updated',
       ]);
      // echo ""; print_r($session_answers); die;
      /*if(DB::table('session_answers')->insert($session_answers)) {
       return Response::json([
       'response' => true,
       'message' => 'data inserted',
       ]);
      }
      else {
       return Response::json([
       'response' => false,
       'message' => 'data not inserted',
       ]);
      }
*/
       
    /*$count = DB::table('session_answers')->where('responder_id', $responder_id)->where('question_id', $ques_id)->count();
    if($count == 0) {
     if(DB::table('session_answers')->insert(['responder_id' => $responder_id, 'question_id' => $ques_id,'answer' => $answer])) {
      return Response::json([
       'response' => true,
       'message' => 'data inserted',
       ]);
     }
     else {
      return Response::json([
       'response' => false,
       'message' => 'data not inserted',
       ]);
     }
    }
    else {
     if(DB::table('session_answers')->where('responder_id', $responder_id)->where('question_id', $ques_id)->update(['answer' => $answer])) {
      return Response::json([
       'response' => true,
       'message' => 'data updated',
       ]);
     }
     else {
      return Response::json([
       'response' => false,
       'message' => 'data not updated',
       ]);
     }
    }*/

 }
}
 public function questions(Request $request)
 {
  if($request->isMethod('post')){
   $postdata = file_get_contents("php://input");
           $data=json_decode($postdata, true);
      //echo ""; print_r($data['email']); die;
      $ques_id = $data['id'];
   // $ques_id  = $request->id;
   $sessionQuestions = DB::table('session_questions')->select('question', 'answer')->where('id',$ques_id)->first();

   if(!empty($sessionQuestions)) {
    return Response::json([
      'response' => true,
      'message' => 'quesetions and answers are the following',
      'result'  =>  $sessionQuestions
      ]);
   }
   
   else {
    return Response::json([
      'response' => false,
      'message' => 'Somthing went wrong',
      ]); 
   }

  }
 }

////////////////////////////////////*Pinned AUdition*//////////////////////////////////////////// 
 public function pinnedAudition(Request $request)
 {
  if($request->isMethod('post')){
   $postdata = file_get_contents("php://input");
           $data=json_decode($postdata, true);
      //echo ""; print_r($data['email']); die;
      // $responder_id = $request->responder_id;
      $responder_id = $data['responder_id'];
   $all_sessions=array();
   $session = DB::table('pinned_audition')->select('session_id')->where('responder_id', $responder_id)->get();
   foreach($session as $sess) {
    $session_id = $sess->session_id;
    $session_details = DB::table('sessions')->where('id',$session_id)->get();
    $all_sessions=array_merge($all_sessions,$session_details);
   }
   return Response::json([
      'response' => true,
      'message' => 'pinned audition details are ',
      'result'  =>  $all_sessions
      ]);
  }
 }

//////////////////////////////*Upload Audition Videos*/////////////////////////////////////////////
 public function auditionVideos(Request $request) 
 {
  if($request->isMethod('post')) {
   if(!empty($_FILES['res_sess']['name'])) {
    $videoneeded = '';
    $microtime = microtime();
    $microtime = str_replace(' ', '', $microtime);
    $microtime = str_replace('.', '', $microtime);

    $file_name = $_FILES['res_sess']['name'];
    $file_type = $_FILES['res_sess']['type'];
    $file_tmpname = $_FILES['res_sess']['tmp_name'];
    $file_size = $_FILES['res_sess']['size'];
    $target_dir = 'public/frontEnd/uploads/video/';

    $target_file = $target_dir .$file_name ;
    $videoFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    $fname_without_ext = pathinfo($target_file,PATHINFO_FILENAME);
    $file_name = $fname_without_ext.$microtime.".".$videoFileType;
    $target_file = $target_dir.$file_name ;
    dd($file_name);
    $ids = trim($fname_without_ext);
    $ids =explode("_",$ids);
    $responder_id = $ids[0];
    $session_id = $ids[1];
    $rescount = DB::table('responders')->where('id', $responder_id)->count();
    $sesscount = DB::table('sessions')->where('id', $session_id)->count();
    if($rescount == 1 && $sesscount == 1) {

    $count = DB::table('responses')->select('id')->where('responder_id',$responder_id)->where('session_id', $session_id)->count();
     if($count == 0) {

     DB::table('responses')->insert(['responder_id'=> $responder_id ,  'session_id'=>$session_id]);
     $response = DB::table('responses')->select('id')->where('responder_id',$responder_id)->where('session_id', $session_id)->first();
     $vcount = DB::table('response_document')->where('response_id', $response->id)->where('document_type', 'video')->count();
     $videoneeded = DB::table('sessions')->select('video_need')->where('id',$session_id)->first();
      if($videoneeded == null) {
         $videoneeded = 0;
        }
        else {
         $videoneeded = $videoneeded->video_need; 
        }
        
       if($vcount path   =  $file_name;
        $response_edit->document_type = 'video';
        $response_edit->response_id = $response->id;
        if(move_uploaded_file($file_tmpname, $target_file)) { 
         if($response_edit->save()) {
          return Response::json([
          'response'  => true,
          'message' => 'video sucessfully uploaded',
          'result' => $file_name
          ]);
         }
        }
        else {
         return Response::json([
        'response' => false,
        'message' => 'file not uploaded' ,
         ]);
        }

       }
       else {
        return Response::json([
         'response' => false,
         'message' => 'Video limit as defined' ,
         'limit' => $videoneeded,
         ]);
       }

      }
     else {
      $response = DB::table('responses')->select('id')->where('responder_id',$responder_id)->where('session_id', $session_id)->first();
      $vcount = DB::table('response_document')->where('response_id', $response->id)->where('document_type', 'video')->count();
      $videoneeded = DB::table('sessions')->select('video_need')->where('id',$session_id)->first();
      if($videoneeded == null) {
       $videoneeded = 0;
      }
      else {
       $videoneeded = $videoneeded->video_need; 
      }
      

       if($vcount path   =  $file_name;
        $response_edit->document_type = 'video';
        $response_edit->response_id = $response->id;
        if(move_uploaded_file($file_tmpname, $target_file)) { 
         if($response_edit->save()) {
          return Response::json([
          'response'  => true,
          'message' => 'video sucessfully uploaded',
          'result' => $file_name
          ]);
          }
         }
         else {
          return Response::json([
         'response' => false,
         'message' => 'file not uploaded' ,
          ]);
         }

        }
       else {
       return Response::json([
       'response' => false,
       'message' => 'Video limit as defined' ,
       'limit' => $videoneeded,
       ]);
       }
      }

     }
     else {
      return Response::json([
       'response' => false,
       'message' => 'Invalid responder or session ! please try again' ,
       ]);
     }

    }
   }
  }

  public function ocdiSession(Request $check_Request){
   if($check_Request->isMethod('post')){
    $postdata = file_get_contents("php://input");
            $id=json_decode($postdata, true);
    if(!empty($check_Request['id'])){

     $data = SessionInfo::where('id', $check_Request['id'])->with('questionDocument')->with('sessionResponse')->first();
     //echo "" ; print_r($data);die;
     $start_date = strtotime($data->start_date);
     $end_date = strtotime($data->end_date);

     if((time() > $end_date) && ($data->session_status == 'active') && ($data->invite_only == 'no')){

      return Response::json([

       'pratikriya'=> true,
       'sundes' => 'Closed Session',
       'parinaam' => $data,

       ]);

     }else if((time()  $start_date) && ($data->session_status == 'active') && ($data->invite_only == 'no')){

      return Response::json([

       'pratikriya' => true,
       'sundes' => 'Open Session',
       'parinaam' => $data,

       ]);

     }else if(($data->invite_only == 'yes') && ($data->session_status == 'active')){

      return Response::json([

       'pratikriya' => true,
       'sundes' => 'Drafted Session',
       'parinaam' => $data,

       ]);

     }else if($data->session_status == 'inactive'){

      return Response::json([

       'pratikriya' => true,
       'sundes' => 'Invite Only Session',
       'parinaam' => $data,

       ]);

     }else{

      return Response::json([

       'pratikriya' => false,
       'sundes' => 'Invalid Entry',

       ]);

     }

    }else{

     return Response::json([

      'pratikriya' => true,
      'sundes' => 'Id not exist',

     ]);

    }
   }
  }

  public function createAudition(Request $request){

   if($request->isMethod('post')){

    $data = $request->all();

    if(!empty($data['id'])){

     //echo "" ; print_r($data);die;
        $requester['start_date'] = $data['start_date'];
           $requester['end_date'] = $data['end_date'];
        $requester['session_name'] = $data['session_name'] ;
        $requester['invite_only'] = $data['invite_only'] ;
        $requester['type'] = $data['type'] ;
        $requester['session_type'] = $data['session_type'] ;
     $requester['short_description'] = $data['short_description'] ;
     $requester['video_length'] = $data['video_length'] ;
     $requester['max_sessions'] = $data['max_sessions'] ;
     $requester['full_description'] = $data['full_description'] ;
     $requester['city']= $data['city'];
     $requester['state']= $data['state'];
     $requester['country']= $data['country'];
     $requester['zip_code']= $data['zip_code'];
     $requester['question1']= $data['question1'];
     $requester['question2']= $data['question2'];
     $requester['question3']= $data['question3'];
     $requester['question4']= $data['question4'];
     $requester['question5']= $data['question5'];

     if($data['submit']=='draft'){

      $requester['session_status']='inactive';

     }
     else{

      $requester['session_status']='active';

     }

     $session = SessionInfo::select('id')->orderBy('id','desc')->first();

     if(SessionInfo::insert($requester)){

      for ($i=1 ; $i true,
       'sundes' => 'Data save successfully',
       'parinaam' => $data,

      ]);

     }else{

      return Response::json([

        'pratikriya' => false,
        'sundes' => 'Data not saved',
        'parinaam' => $data,

       ]);
      
     }

    }

   }else{

    return Response::json([

     'response' => false,
     'message' =>'Incorect Request'

     ]);

   }

  }

}
?>