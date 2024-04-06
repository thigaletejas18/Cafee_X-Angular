import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ActivityComponent } from '../../activity/activity.component';
import { ActivityService } from '../../activity/activity.service';
import { Mail } from '../../activity/activity.types';
import { Observable, Subject, combineLatest, finalize, forkJoin, of, takeUntil, tap } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MailboxSidebarComponent } from '../sidebar/sidebar.component';
import { ITEMS_PER_PAGE, TOTAL_COUNT_RESPONSE_HEADER } from 'app/core/config/pagination.constants';
import { IInbox } from 'app/model/inbox.model';
import { SelectionModel } from '@angular/cdk/collections';
import { InboxService } from 'app/service/inbox.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ASC, DESC } from 'app/core/config/navigation.constants';
import { EntityArrayResponseType } from 'app/service/prospect.service';
import { TextPlusComponent } from 'app/common/text-plus/text-plus.component';
import { EmailMessageService } from 'app/service/email-messages.service';
import { EmptyStateComponent } from 'app/common/empty-state/empty-state.component';

@Component({
    selector: 'activity-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule, RouterLink, MatProgressBarModule, NgFor, NgClass, RouterOutlet, DatePipe,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        MatSidenavModule,
        CommonModule,
        RouterOutlet,
        MatCheckboxModule,
        MatMenuModule,
        MatSidenavModule, MailboxSidebarComponent,
        TextPlusComponent, EmptyStateComponent],
})
export class MailboxListComponent implements OnInit, OnDestroy {
    @ViewChild('mailList') mailList: ElementRef;

    mails: Mail[];
    mailsLoading: boolean = false;
    pagination: any;
    selectedMail: Mail;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    selection = new SelectionModel<any>(true, []);
    inboxesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    inboxesTableColumns: string[] = ['to', 'campaign', 'subject', 'from', 'date'];
    inboxes: IInbox[] = [];
    isLoading = false;
    pageOptions: number[] = [5, 10, 25, 100];
    predicate = 'id';
    ascending = true;
    inboxId: string = '';

    itemsPerPage = ITEMS_PER_PAGE;
    totalItems: number = 0;
    page: number = 0;

    inboxType: string = 'All';
    /**
     * Constructor
     */
    constructor(
        public _activityComponent: ActivityComponent,
        private _activityService: ActivityService,
        private _emailMessageService: EmailMessageService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ inboxId }) => {
            this.loadPage(inboxId);
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    loadPage(inboxId: string): void {
        this.inboxId = inboxId;
        this.inboxes = [];
        this.inboxesDataSource.data = [];
        this.totalItems = 0;
        this.page = 0;
        this.queryBackend(inboxId, this.page, this.itemsPerPage, this.predicate, this.ascending).subscribe({
            next: (res: EntityArrayResponseType) => {
                this.onResponseSuccess(res);
            },
        });


    }

    handlePageEvent($event) {
        this.queryBackend(this.inboxId, $event.pageIndex, $event.pageSize, this.predicate, this.ascending).subscribe({
            next: (res: EntityArrayResponseType) => {
                this.onResponseSuccess(res);
            },
        });
    }

    openMail(mail) {
        this._router.navigate(['/workspace/activity/mail', mail.id]);
    }

    protected queryBackend(
        inboxId,
        page?: number,
        size?: number,
        predicate?: string,
        ascending?: boolean,
    ): Observable<EntityArrayResponseType> {
        this.isLoading = true;
        const pageToLoad: number = page ?? 0;
        const queryObject: any = {
            page: pageToLoad,
            size: size ?? ITEMS_PER_PAGE,
            sort: this.getSortQueryParam(predicate, ascending),
        };
        return this.getEndpointForInbox(queryObject, inboxId).pipe(tap(() => { this.page = page; }), finalize(()=>{ this.isLoading = false; }));
    }

    getEndpointForInbox(queryObject, inboxId: string){
        return inboxId === 'all' ? this._emailMessageService.query(queryObject) :
        this._emailMessageService.loadEmailsForInbox(inboxId, queryObject)
    }

    protected onResponseSuccess(response: EntityArrayResponseType): void {
        this.totalItems = Number(response?.headers?.get(TOTAL_COUNT_RESPONSE_HEADER));
        const dataFromBody = response.body ?? [];
        this.inboxes = dataFromBody;
        this.inboxesDataSource.data = dataFromBody;
    }

    protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
        const ascendingQueryParam = ascending ? ASC : DESC;
        if (predicate === '') {
            return [];
        } else {
            return [predicate + ',' + ascendingQueryParam];
        }
    }


}
