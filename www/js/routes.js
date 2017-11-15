angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:false
  })

  .state('loginAsRequester', {
    url: '/page6',
    templateUrl: 'templates/loginAsRequester.html',
    controller: 'loginAsRequesterCtrl',
   onEnter: function($state){
        if(localStorage['auth']=='true'){
           $state.go('myDashboard');
        }
    }
  })

  .state('requesterSignUp', {
    url: '/page7',
    templateUrl: 'templates/requesterSignUp.html',
    controller: 'requesterSignUpCtrl'
  })

  .state('myDashboard', {
    url: '/page11',
        templateUrl: 'templates/myDashboard.html',
        controller: 'myDashboardCtrl'
    
  })

  .state('createNewAudition', {
    url: '/page8',
        templateUrl: 'templates/createNewAudition.html',
        controller: 'createNewAuditionCtrl'
     
  })

  .state('openAuditions', {
    url: '/page9',
   
        templateUrl: 'templates/openAuditions.html',
        controller: 'openAuditionsCtrl'
    
  })

  .state('inviteOnlyAuditions', {
    url: '/page13',
    
        templateUrl: 'templates/inviteOnlyAuditions.html',
        controller: 'inviteOnlyAuditionsCtrl'
    
  })

.state('closedAuditions', {
    url: '/page14',
    
        templateUrl: 'templates/closedAuditions.html',
        controller: 'closedAuditionsCtrl'
   
  })

.state('draftedAuditions', {
    url: '/page15',
    
        templateUrl: 'templates/draftedAuditions.html',
        controller: 'draftedAuditionsCtrl'
     
  })
  .state('editAudition', {
    url: '/page16/:id',
    
        templateUrl: 'templates/editAudition.html',
        controller: 'editAuditionCtrl'
    
  })
  .state('editAuditionInvite', {
    url: '/page19/:id',
    
        templateUrl: 'templates/editAuditionInvite.html',
        controller: 'editAuditionInviteCtrl'
    
  })
  .state('editAuditionClosed', {
    url: '/page20/:id',
   
        templateUrl: 'templates/editAuditionClosed.html',
        controller: 'editAuditionClosedCtrl'
     
  })
  .state('editAuditionDrafted', {
    url: '/page21/:id',
   
        templateUrl: 'templates/editAuditionDrafted.html',
        controller: 'editAuditionDraftedCtrl'
   
  })

.state('inviteUsers', {
    url: '/page17/:id',
   
        templateUrl: 'templates/inviteUsers.html',
        controller: 'inviteUsersCtrl'
     
  })

.state('forgetPassword', {
    url: '/page18',
     templateUrl: 'templates/forgetPassword.html',
    controller: 'forgetPasswordCtrl'
      
  })
.state('videoPlay', {
    url: '/page16',
    
        templateUrl: 'templates/videoPlay.html',
        controller: 'videoPlayCtrl'
    
  })


  .state('talentPool', {
    url: '/page12',
   
        templateUrl: 'templates/talentPool.html',
        controller: 'talentPoolCtrl'
     
  })
  .state('abouttalentpool', {
    url: '/page22/:id',
    
        templateUrl: 'templates/abouttalentpool.html',
        controller: 'abouttalentpoolCtrl'

  })
  .state('selected', {
    url: '/page23/:id',
   
        templateUrl: 'templates/selected.html',
        controller: 'selectedCtrl'
   
  })

  .state('newsubmission', {
    url: '/page24/:id',
    
        templateUrl: 'templates/newsubmission.html',
        controller: 'newSubmissionCtrl'
    
  })
  .state('rejected', {
    url: '/page25/:id',
    
        templateUrl: 'templates/rejected.html',
        controller: 'rejectedCtrl'
     
  })
  .state('pending', {
    url: '/page26/:id',
   
        templateUrl: 'templates/pending.html',
        controller: 'pendingCtrl'
    
  })
  .state('trash', {
    url: '/page27/:id',
   
        templateUrl: 'templates/trash.html',
        controller: 'trashCtrl'
     
  })
  .state('invitenSubmission', {
    url: '/page29/:id',
   
        templateUrl: 'templates/inviteSubmission.html',
        controller: 'invitenewSubmissionCtrl'
    
  })
  .state('inviteSelected', {
    url: '/page30/:id',
    
        templateUrl: 'templates/inviteSelected.html',
        controller: 'inviteselectedCtrl'
    
  })
   .state('inviteRejected', {
    url: '/page31/:id',
    
        templateUrl: 'templates/inviteRejected.html',
        controller: 'inviterejectedCtrl'
      
  })
  .state('invitePending', {
    url: '/page32/:id',
    
        templateUrl: 'templates/invitePending.html',
        controller: 'invitependingCtrl'
      
  })
  .state('inviteTrash', {
    url: '/page33/:id',
        templateUrl: 'templates/inviteTrash.html',
        controller: 'invitetrashCtrl'
      
  })
  .state('deleteSubmission', {
    url: '/page34/:id',
    
        templateUrl: 'templates/deleteSubmission.html',
        controller: 'deletenewSubmissionCtrl'
     
  })
  .state('deleteSelected', {
    url: '/page35/:id',
    
        templateUrl: 'templates/deleteSelected.html',
        controller: 'deleteselectedCtrl'
      
  })
   .state('deleteRejected', {
    url: '/page36/:id',
   
        templateUrl: 'templates/deleteRejected.html',
        controller: 'deleterejectedCtrl'
     
  })
  .state('deletePending', {
    url: '/page37/:id',
    
        templateUrl: 'templates/deletePending.html',
        controller: 'deletependingCtrl'
      
  })
  .state('deleteTrash', {
    url: '/page38/:id',
    
        templateUrl: 'templates/deleteTrash.html',
        controller: 'deletetrashCtrl'
     
  })

   .state('tabsController.profile', {
    url: '/page39',
    views: {
      'tab1': {
        templateUrl: 'templates/profile.html',
        controller: 'viewCtrl'
      }
    }
  })

   .state('tabsController.photo', {
    url: '/page40',
    views: {
      'tab4': {
        templateUrl: 'templates/photo.html',
        controller: 'viewCtrl'
      }
    }
  })

   .state('tabsController.video', {
    url: '/page41',
    views: {
      'tab5': {
        templateUrl: 'templates/video.html',
        controller: 'viewCtrl'
      }
    }
  })
   
   .state('tabsController.answer', {
    url: '/page42',
    views: {
      'tab2': {
        templateUrl: 'templates/answer.html',
        controller: 'viewCtrl'
      }
    }
  })

   .state('tabsController.note', {
    url: '/page43',
    views: {
      'tab3': {
        templateUrl: 'templates/note.html',
        controller: 'viewCtrl'
      }
    }
  })

   .state('tabsController.download', {
    url: '/page44',
    views: {
      'tab6': {
        templateUrl: 'templates/download.html',
        controller: 'viewCtrl'
      }
    }
  })

  .state('dashboard', {
    url: '/page10',
    templateUrl: 'templates/dashboard.html',
    controller: 'dashboardCtrl'
  })

  .state('setting', {
    url: '/page45',
    templateUrl: 'templates/setting.html',
    controller: 'settingCtrl'
  })
   .state('requesterProfile', {
    url: '/page46',
    templateUrl: 'templates/requesterProfile.html',
    controller: 'requesterProfileCtrl'
  })
    .state('requesterEditProfile', {
    url: '/page47',
    templateUrl: 'templates/requesterEditProfile.html',
    controller: 'requesterProfileCtrl'
  })

  .state('Upload Documents', {
    url: '/page48',
    templateUrl: 'templates/upload documents.html',
    controller: 'addDocumentsCtrl'
  })
  .state('editDocuments', {
    url: '/page49',
    templateUrl: 'templates/editdocuments.html',
    controller: 'editDocumentsCtrl'
  })
  .state('editDocumentsInvite', {
    url: '/page50',
    templateUrl: 'templates/editdocumentsInvite.html',
    controller: 'editDocumentsInviteCtrl'
  })
  .state('editDocumentsClosed', {
    url: '/page51',
    templateUrl: 'templates/editdocumentsClosed.html',
    controller: 'editDocumentsClosedCtrl'
  })
  .state('editDocumentsDrafted', {
    url: '/page52',
    templateUrl: 'templates/editdocumentsDrafted.html',
    controller: 'editDocumentDraftedCtrl'
  })
  .state('notification', {
    url: '/page53',
    templateUrl: 'templates/notification.html',
    controller: 'menuCtrl'
  })
  .state('stripes', {
    url: '/page211',
    templateUrl: 'templates/stripe.html',
    controller: 'stripeCtrl',
  })
  .state('membership', {
    url: '/page212',
    templateUrl: 'templates/membership.html',
    controller: 'membershipCtrl',
  })

$urlRouterProvider.otherwise('page6')

  

});