///////////////////////////////////////*Payment Check*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
<?php
 public function paymentCheck(Request $request){
  $postdata = file_get_contents("php://input");
    $data     = json_decode($postdata, true);
    $requester_id = $data['requester_id'];
    //$requester_id = $request->requester_id;

    $r_count = DB::table('requesters')->where('id', $requester_id)->where('create_session_status', 'active')->count();
    if ($r_count == 0) {
        DB::table('requesters')->where('id', $requester_id)->update(['create_session_status' => 'active']);

        // echo 'active';die;
        //return redirect('/requester/choose/plan')->with('flash-message', 'please choose plans before proceeding further');
        return Response::json([
                'response'  => false,
                'message'   => 'please choose plans on our website before proceeding further'
            ]);
    }
    else{
        $purchase = DB::table('purchases')->select('created_at')->where('requester_id', $requester_id)->orderBy('id', 'DESC')->first();
        if (count($purchase) == 1) {
            $created_at = $purchase->created_at;
            $curr_date = date('Y-m-d');
            $month_later = date('Y-m-d', strtotime('+1 month', strtotime($created_at)));
            if ($curr_date > $month_later) {
              return Response::json([
                      'response'  => false,
                      'message'   => 'Your Subscription period has expired, please upgrade plan on our website'
                  ]);
                /*Subscribe again purchase expired starts*/
                // echo 'purchase';die;
                //return redirect('/requester/choose/plan')->with('flash-message-error', 'Your Subscription period has expired .please subscribe again');
                /*Subscribe again purchase expired ends*/
            }else{
              return Response::json([
                      'response'  => true,
                      'message'   => 'allow to create session'
                  ]);
            }
        }else{
            $sess_count = DB::table('sessions')->where('requester_id', $requester_id)->count();
            if ($sess_count == 5 || $sess_count > 5) {
              return Response::json([
                      'response'  => false,
                      'message'   => 'Please upgrade plan on our website to create more sessions'
                  ]); result
                // echo 'five';die;
                //return redirect('/requester/choose/plan')->with('flash-message-error', 'Please subcribe our paid service to create more sessions');
            }else{
              return Response::json([
                      'response'  => true,
                      'message'   => 'allow to create session'
                  ]);
            }
        }
    }
}