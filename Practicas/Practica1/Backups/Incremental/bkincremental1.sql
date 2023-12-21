# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#231209  2:45:31 server id 1  end_log_pos 126 CRC32 0xf0d75652 	Start: binlog v 4, server v 8.0.34 created 231209  2:45:31
# Warning: this binlog is either in use or was not closed properly.
BINLOG '
Kyl0ZQ8BAAAAegAAAH4AAAABAAQAOC4wLjM0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEwANAAgAAAAABAAEAAAAYgAEGggAAAAICAgCAAAACgoKKioAEjQA
CigAAVJW1/A=
'/*!*/;
# at 126
#231209  2:45:31 server id 1  end_log_pos 157 CRC32 0x7d2e800c 	Previous-GTIDs
# [empty]
# at 157
#231209  2:45:47 server id 1  end_log_pos 236 CRC32 0x2a8dfeb2 	Anonymous_GTID	last_committed=0	sequence_number=1	rbr_only=yes	original_committed_timestamp=1702111547976384	immediate_commit_timestamp=1702111547976384	transaction_length=688
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
# original_commit_timestamp=1702111547976384 (2023-12-09 02:45:47.976384 Hora estándar, América Central)
# immediate_commit_timestamp=1702111547976384 (2023-12-09 02:45:47.976384 Hora estándar, América Central)
/*!80001 SET @@session.original_commit_timestamp=1702111547976384*//*!*/;
/*!80014 SET @@session.original_server_version=80034*//*!*/;
/*!80014 SET @@session.immediate_server_version=80034*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 236
#231209  2:45:47 server id 1  end_log_pos 318 CRC32 0x7e1d9dba 	Query	thread_id=43	exec_time=0	error_code=0
SET TIMESTAMP=1702111547/*!*/;
SET @@session.pseudo_thread_id=43/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113696/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
BEGIN
/*!*/;
# at 318
#231209  2:45:47 server id 1  end_log_pos 387 CRC32 0x2d15c7a1 	Table_map: `bdclinica`.`habitacion` mapped to number 99
# has_generated_invisible_primary_key=0
# at 387
#231209  2:45:47 server id 1  end_log_pos 814 CRC32 0xe0f3a915 	Write_rows: table id 99 flags: STMT_END_F

BINLOG '
Oyl0ZRMBAAAARQAAAIMBAAAAAGMAAAAAAAMACWJkY2xpbmljYQAKaGFiaXRhY2lvbgACAw8CyAAC
AQEAAgP8/wChxxUt
Oyl0ZR4BAAAAqwEAAC4DAAAAAGMAAAAAAAEAAgAC/wABAAAAElNhbGEgZGUgZXhhbWVuZXMgMQAC
AAAAElNhbGEgZGUgZXhhbWVuZXMgMgADAAAAElNhbGEgZGUgZXhhbWVuZXMgMwAEAAAAElNhbGEg
ZGUgZXhhbWVuZXMgNAAFAAAAElNhbGEgZGUgaW1hZ2VuZXMgMQAGAAAAGFNhbGEgZGUgcHJvY2Vk
aW1pZW50b3MgMQAHAAAAGFNhbGEgZGUgcHJvY2VkaW1pZW50b3MgMgAIAAAAGFNhbGEgZGUgcHJv
Y2VkaW1pZW50b3MgMwAJAAAAGFNhbGEgZGUgcHJvY2VkaW1pZW50b3MgNAAKAAAACVJlY2VwY2lv
bgALAAAAC0xhYm9yYXRvcmlvAAwAAAAYRXN0YWNpwqJuIGRlIHJldmlzacKibiAxAA0AAAAYRXN0
YWNpwqJuIGRlIHJldmlzacKibiAyAA4AAAAYRXN0YWNpwqJuIGRlIHJldmlzacKibiAzAA8AAAAY
RXN0YWNpwqJuIGRlIHJldmlzacKibiA0Fanz4A==
'/*!*/;
# at 814
#231209  2:45:47 server id 1  end_log_pos 845 CRC32 0x779bc66c 	Xid = 4222
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
